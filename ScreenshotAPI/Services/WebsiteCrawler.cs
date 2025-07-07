using ScreenshotAPI.Models;
using PuppeteerSharp;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Net.Http;
using System.Text;
using ScreenshotAPI.Services;
using ScreenshotAPI.Models;


namespace ScreenshotAPI.Services
{

    public class WebsiteCrawler : IWebsiteCrawler
    {
        // .NET class used to send HTTP requests and receive responses
        private readonly HttpClient _httpClient;
        private const string GROQ_API_KEY = "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";
        private const string GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
        private readonly IWebsiteCrawler _crawler;


        private readonly UrlLivenessService _urlLivenessService;

        public WebsiteCrawler(UrlLivenessService urlLivenessService)
        {
            _urlLivenessService = urlLivenessService ?? throw new ArgumentNullException(nameof(urlLivenessService));
            _httpClient = new HttpClient();
        }

        // create a new HttpClient
        public WebsiteCrawler()
        {
            _httpClient = new HttpClient();
        }


        public async Task<CrawlResult> CrawlAsync(string url, string targetName)
        {
            bool? initialUrlLiveness = null;
            bool? matchedUrlLiveness = null;
            try
            {

                Console.WriteLine("🌐 Calling URL liveness check...");
                var livenessResult = await _urlLivenessService.CheckUrlLivenessAsync(url);
                Console.WriteLine("✅ URL liveness check completed.");
                bool? isMatchedLive = livenessResult?.IsLive;
                Console.WriteLine($"🚀 Starting crawl - URL: {url}, Target: {targetName}");
                Console.WriteLine($"🕐 Timestamp: {DateTime.Now}");

                if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(targetName))
                    throw new ArgumentException("URL and Target Name are required");

                var baseUrl = GetBaseUrl(url);
                Console.WriteLine($"🌐 Base URL extracted: {baseUrl}");

                var foundUrls = new List<string>();
                var foundUrlsWithNavigationPath = new List<NavigationPathData>();
                var externalRedirects = new List<ExternalRedirectData>();
                var competitorAnalysis = new List<CompetitorData>();

                // Setup Puppeteer with detailed logging
                Console.WriteLine("🔧 Setting up Puppeteer...");
                var browserFetcher = new BrowserFetcher();

                Console.WriteLine("📥 Downloading browser if needed...");
                await browserFetcher.DownloadAsync();
                Console.WriteLine("✅ Browser download completed");

                var launchOptions = new LaunchOptions
                {
                    Headless = false, // Changed to true for production
                    Args = new[]
                    {"--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-extensions","--disable-gpu","--disable-web-security",
                        "--allow-running-insecure-content","--disable-features=VizDisplayCompositor",
                    }
                };

                using var browser = await Puppeteer.LaunchAsync(launchOptions);
                using var page = await browser.NewPageAsync();
                await page.SetViewportAsync(new ViewPortOptions { Width = 1366, Height = 768 });
                await page.SetUserAgentAsync("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

                Console.WriteLine($"Navigating to base URL: {baseUrl}");
                await page.GoToAsync(baseUrl, new NavigationOptions { Timeout = 30000, WaitUntil = new[] { WaitUntilNavigation.Networkidle2 } });
                await Task.Delay(3000);

                Console.WriteLine("Starting DFS crawl...");
                var visited = new HashSet<string>();
                var normalizedVisited = new HashSet<string>();
                var parentMap = new Dictionary<string, string>();
                var originalUrlMap = new Dictionary<string, string>();

                // Perform DFS traversal
                await IterativeDfsTraverse(page, baseUrl, targetName.ToLower(), visited, normalizedVisited,
                    foundUrls, foundUrlsWithNavigationPath, baseUrl, parentMap, originalUrlMap, externalRedirects);

                // Analyze competitors if external redirects found
                if (externalRedirects.Count > 0)
                {
                    Console.WriteLine($"Found {externalRedirects.Count} external redirects. Analyzing competitors...");
                    var (analysisList, count, links) = await AnalyzeCompetitors(targetName, externalRedirects);
                    competitorAnalysis = analysisList;

                }

                // Take screenshot of first found page with enhanced error handling
                string screenshotBase64 = null;
                string matchedPageUrl = null;

                if (foundUrls.Count > 0)
                {
                    matchedPageUrl = GetMostSpecificUrl(foundUrls, targetName);
                    Console.WriteLine($"🎯 Taking final screenshot of matched page: {matchedPageUrl}");

                    Console.WriteLine("🌐 Checking matched URL liveness...");
                    var matchedUrlLivenessResult = await _urlLivenessService.CheckUrlLivenessAsync(matchedPageUrl);
                    matchedUrlLiveness = matchedUrlLivenessResult?.IsLive;
                    Console.WriteLine($"✅ Matched URL liveness check completed. Result: {matchedUrlLiveness}");

                    //  Check if screenshot already exists in path
                    var matchedStep = foundUrlsWithNavigationPath
                        .SelectMany(p => p.NavigationSteps)
                        .FirstOrDefault(s => NormalizeUrl(s.Url) == NormalizeUrl(matchedPageUrl) && !string.IsNullOrEmpty(s.Screenshot));

                    if (matchedStep != null)
                    {
                        screenshotBase64 = matchedStep.Screenshot;
                        Console.WriteLine("Reused screenshot from navigation path for final result.");
                    }
                    else
                    {
                        Console.WriteLine("Retaking screenshot of final matched page (not found in path)");

                        try
                        {
                            bool finalNavigationSuccess = false;
                            int finalRetryCount = 0;

                            while (!finalNavigationSuccess && finalRetryCount < 3)
                            {
                                try
                                {
                                    await page.GoToAsync(matchedPageUrl, new NavigationOptions
                                    {
                                        Timeout = 25000,
                                        WaitUntil = new[] { WaitUntilNavigation.DOMContentLoaded }
                                    });

                                    await Task.Delay(5000);
                                    var finalTitle = await page.GetTitleAsync();
                                    Console.WriteLine($" Final page title: {finalTitle}");
                                    finalNavigationSuccess = true;
                                }
                                catch (Exception navEx)
                                {
                                    finalRetryCount++;
                                    Console.WriteLine($"Final navigation attempt {finalRetryCount} failed: {navEx.Message}");
                                    if (finalRetryCount < 3) await Task.Delay(3000);
                                }
                            }

                            if (finalNavigationSuccess)
                            {
                                screenshotBase64 = await TakeScreenshot(page, "Final result");

                                if (string.IsNullOrEmpty(screenshotBase64))
                                {
                                    Console.WriteLine("⚠️ Screenshot is empty, trying viewport-only screenshot");
                                    try
                                    {
                                        var altScreenshotBytes = await page.ScreenshotDataAsync(new ScreenshotOptions
                                        {
                                            Type = ScreenshotType.Png,
                                            FullPage = false,
                                            Quality = 90
                                        });

                                        if (altScreenshotBytes != null && altScreenshotBytes.Length > 0)
                                        {
                                            screenshotBase64 = "data:image/png;base64," + Convert.ToBase64String(altScreenshotBytes);
                                            Console.WriteLine("✅ Alternative viewport screenshot successful");
                                        }
                                    }
                                    catch (Exception altEx)
                                    {
                                        Console.WriteLine($"❌ Alternative screenshot also failed: {altEx.Message}");
                                    }
                                }
                            }
                            else
                            {
                                Console.WriteLine("❌ Failed to navigate to matched page for final screenshot");
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"❌ Error taking final screenshot: {ex.Message}");
                            Console.WriteLine($"Stack trace: {ex.StackTrace}");
                        }
                    }
                }

                else
                {
                    //  FIXED: If no matched URL found, use initial URL liveness
                    matchedUrlLiveness = initialUrlLiveness;
                    Console.WriteLine("🔍 No target found, using initial URL liveness for matched URL liveness.");
                }

                Console.WriteLine($"Crawl completed. Pages visited: {normalizedVisited.Count}, Target found: {foundUrls.Count}");

                var finalCompetitorList = competitorAnalysis.Where(c => c.IsCompetitor).ToList();
                var competitorCount = finalCompetitorList.Count;
                var competitorLinks = finalCompetitorList.Select(c => c.ExternalUrl).ToList();

                return new CrawlResult
                {
                    Website = url,
                    TargetName = targetName,
                    Found = foundUrls.Count > 0,
                    MatchedPageUrl = matchedPageUrl,
                    ScreenshotBase64 = screenshotBase64,
                    FoundUrls = foundUrls,
                    SearchedPages = normalizedVisited.Count,
                    ExternalRedirects = externalRedirects.Select(r => r.Url).ToList(),
                    CompetitorAnalysis = string.Join(", ", competitorAnalysis.Select(c => c.Name)),
                    IsMatchedUrlLive = isMatchedLive,
                    CompetitorCount = competitorCount,
                    CompetitorLinks = competitorLinks
                };


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Crawl error: {ex.Message}");
                return new CrawlResult
                {
                    Website = url,
                    TargetName = targetName,
                    Found = false,
                    Error = ex.Message,
                    IsMatchedUrlLive = initialUrlLiveness,
                };
            }

        }

        private string GetMostSpecificUrl(List<string> foundUrls, string targetName)
        {
            if (foundUrls == null || foundUrls.Count == 0)
                return null;

            var targetLower = targetName.ToLower();

            //  Step 0: Force preference for manually matched link (e.g., /admindroid)
            var preferredUrl = foundUrls.FirstOrDefault(url =>
                NormalizeUrl(url).EndsWith("/" + targetLower, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(preferredUrl))
            {
                Console.WriteLine("🎯 Using manually matched MSP link: " + preferredUrl);
                return preferredUrl;
            }

            //  Step 1: Exact segment match
            var exactPathMatches = foundUrls.Where(url =>
            {
                try
                {
                    var uri = new Uri(url);
                    var pathSegments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

                    return pathSegments.Any(segment =>
                        segment.Equals(targetLower, StringComparison.OrdinalIgnoreCase));
                }
                catch
                {
                    return false;
                }
            }).ToList();

            if (exactPathMatches.Count > 0)
            {
                var bestExactMatch = exactPathMatches
                    .OrderBy(url =>
                    {
                        try
                        {
                            var uri = new Uri(url);
                            var pathSegments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

                            var hasExactSegment = pathSegments.Any(segment =>
                                segment.Equals(targetLower, StringComparison.OrdinalIgnoreCase));

                            var exactSegmentIndex = Array.FindIndex(pathSegments, segment =>
                                segment.Equals(targetLower, StringComparison.OrdinalIgnoreCase));

                            return pathSegments.Length * 100 - (exactSegmentIndex >= 0 ? 1000 : 0);
                        }
                        catch
                        {
                            return int.MaxValue;
                        }
                    })
                    .ThenBy(url => url.Length)
                    .First();

                Console.WriteLine($"🎯 Selected exact path match: {bestExactMatch}");
                return bestExactMatch;
            }

            //  Step 2: Partial path matches
            var partialPathMatches = foundUrls.Where(url =>
            {
                try
                {
                    var uri = new Uri(url);
                    return uri.AbsolutePath.ToLower().Contains($"/{targetLower}") ||
                        uri.AbsolutePath.ToLower().Contains(targetLower);
                }
                catch
                {
                    return false;
                }
            }).ToList();

            if (partialPathMatches.Count > 0)
            {
                var bestPartialMatch = partialPathMatches
                    .OrderBy(url =>
                    {
                        try
                        {
                            var uri = new Uri(url);
                            var pathLower = uri.AbsolutePath.ToLower();
                            var targetIndex = pathLower.IndexOf(targetLower);

                            var isExactWordMatch = (targetIndex == 0 || pathLower[targetIndex - 1] == '/') &&
                                                (targetIndex + targetLower.Length == pathLower.Length ||
                                                    pathLower[targetIndex + targetLower.Length] == '/' ||
                                                    pathLower[targetIndex + targetLower.Length] == '?' ||
                                                    pathLower[targetIndex + targetLower.Length] == '#');

                            return targetIndex + (isExactWordMatch ? 0 : 1000);
                        }
                        catch
                        {
                            return int.MaxValue;
                        }
                    })
                    .ThenBy(url => url.Length)
                    .First();

                Console.WriteLine($"🎯 Selected partial path match: {bestPartialMatch}");
                return bestPartialMatch;
            }

            //  Step 3: Anywhere match
            var anywhereMatches = foundUrls.Where(url =>
                url.ToLower().Contains(targetLower)
            ).ToList();

            if (anywhereMatches.Count > 0)
            {
                var bestAnywhereMatch = anywhereMatches
                    .OrderBy(url => url.ToLower().IndexOf(targetLower))
                    .ThenBy(url => url.Length)
                    .First();

                Console.WriteLine($"🎯 Selected anywhere match: {bestAnywhereMatch}");
                return bestAnywhereMatch;
            }

            var fallbackUrl = foundUrls.First();
            Console.WriteLine($"🎯 Using fallback URL: {fallbackUrl}");
            return fallbackUrl;
        }


        private async Task IterativeDfsTraverse(IPage page, string startUrl, string target, HashSet<string> visited,
            HashSet<string> normalizedVisited, List<string> foundUrls, List<NavigationPathData> foundUrlsWithNavigationPath,
            string baseUrl, Dictionary<string, string> parentMap, Dictionary<string, string> originalUrlMap,
            List<ExternalRedirectData> externalRedirects)
        {
            var stack = new Stack<string>();
            var depthMap = new Dictionary<string, int>();
            stack.Push(startUrl);
            depthMap[NormalizeUrl(startUrl)] = 0;
            originalUrlMap[NormalizeUrl(startUrl)] = startUrl;

            while (stack.Count > 0 && normalizedVisited.Count < 500)
            {
                var currentUrl = stack.Pop();
                var normalizedCurrent = NormalizeUrl(currentUrl);
                var currentDepth = depthMap.ContainsKey(normalizedCurrent) ? depthMap[normalizedCurrent] : 0;

                if (currentDepth > 5 || normalizedVisited.Contains(normalizedCurrent))
                {
                    continue;
                }

                visited.Add(currentUrl);
                normalizedVisited.Add(normalizedCurrent);
                originalUrlMap[normalizedCurrent] = currentUrl;

                Console.WriteLine($"Visiting page {normalizedVisited.Count}: {currentUrl} (depth: {currentDepth})");

                try
                {
                    await page.GoToAsync(currentUrl, new NavigationOptions
                    {
                        Timeout = 15000,
                        WaitUntil = new[] { WaitUntilNavigation.Networkidle2 }
                    });
                    await Task.Delay(2000);

                    var pageContent = await page.EvaluateExpressionAsync<string>("document.body.innerText.toLowerCase()");
                    var hasTargetInText = IsExactTargetMatch(pageContent, target);
                    var hasTargetInElements = await CheckTargetInElements(page, target);

                    bool isExactUrlMatch = currentUrl.ToLower().Split('/', StringSplitOptions.RemoveEmptyEntries)
                    .Any(segment => segment.Equals(target.ToLower()));

                    if ((hasTargetInText || hasTargetInElements) && isExactUrlMatch)
                    {
                        Console.WriteLine($"✅ TARGET FOUND on page: {currentUrl}");
                        if (!foundUrls.Contains(currentUrl))
                        {
                            foundUrls.Add(currentUrl);
                        }

                        // FIXED: Always capture navigation path for target pages
                        if (currentUrl.ToLower().Contains($"/{target.ToLower()}"))
                        {
                            Console.WriteLine($"📸 This URL has path match and will be captured: {currentUrl}");
                            var pathScreenshots = await CaptureNavigationPath(page, currentUrl, parentMap, originalUrlMap, baseUrl, target);
                            if (pathScreenshots.Count > 0)
                            {
                                foundUrlsWithNavigationPath.Add(new NavigationPathData
                                {
                                    TargetUrl = currentUrl,
                                    NavigationSteps = pathScreenshots
                                });
                            }
                            else
                            {
                                Console.WriteLine($"🚫 URL contains target text but not in path: {currentUrl}");
                            }
                        }
                    }

                    // Detect external redirects
                    await DetectExternalRedirects(page, currentUrl, baseUrl, externalRedirects);

                    // Get internal links for continued traversal
                    var links = await GetInternalLinks(page, baseUrl);
                    Console.WriteLine($"Found {links.Length} unique internal links to explore");

                    for (int i = links.Length - 1; i >= 0; i--)
                    {
                        var link = links[i];
                        var normalizedLink = NormalizeUrl(link);

                        if (!parentMap.ContainsKey(normalizedLink) && !normalizedVisited.Contains(normalizedLink))
                        {
                            parentMap[normalizedLink] = normalizedCurrent;
                            depthMap[normalizedLink] = currentDepth + 1;
                            stack.Push(link);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing page {currentUrl}: {ex.Message}");
                }
            }
        }

        private async Task<(List<CompetitorData>, int, List<string>)> AnalyzeCompetitors(
    string targetCompany,
    List<ExternalRedirectData> externalRedirects)

        {
            var competitorAnalysis = new List<CompetitorData>();
            var finalCompetitorList = competitorAnalysis.Where(c => c.IsCompetitor).ToList();
            var competitorCount = finalCompetitorList.Count;
            var competitorLinks = finalCompetitorList.Select(c => c.ExternalUrl).ToList();

            foreach (var redirect in externalRedirects)
            {
                try
                {
                    var prompt = $@"
                    Analyze if the website '{redirect.ExternalUrl}' is a competitor to '{targetCompany}'.

                    Consider the following factors:
                    1. Do they offer similar products/services?
                    2. Do they target the same market/audience?
                    3. Are they in the same industry?
                    4. Would customers choose between these two companies?

                    Respond in JSON format:
                    {{
                        ""isCompetitor"": true/false,
                        ""confidenceScore"": 0-100,
                        ""reasoning"": ""brief explanation"",
                        ""industry"": ""detected industry"",
                        ""similarServices"": [""list of similar services if any""]
                    }}

                    Be accurate and provide only factual analysis.";

                    var groqResponse = await CallGroqAPI(prompt);

                    if (!string.IsNullOrEmpty(groqResponse))
                    {
                        try
                        {
                            var analysis = JsonSerializer.Deserialize<CompetitorAnalysisResponse>(groqResponse);

                            competitorAnalysis.Add(new CompetitorData
                            {
                                ExternalUrl = redirect.ExternalUrl,
                                SourceUrl = redirect.SourceUrl,
                                RedirectType = redirect.RedirectType,
                                IsCompetitor = analysis.IsCompetitor,
                                ConfidenceScore = analysis.ConfidenceScore,
                                Reasoning = analysis.Reasoning,
                                Industry = analysis.Industry,
                                SimilarServices = analysis.SimilarServices
                            });

                            Console.WriteLine($"✅ Analyzed {redirect.ExternalUrl} - Competitor: {analysis.IsCompetitor} (Confidence: {analysis.ConfidenceScore}%)");
                        }
                        catch (JsonException)
                        {
                            competitorAnalysis.Add(new CompetitorData
                            {
                                ExternalUrl = redirect.ExternalUrl,
                                SourceUrl = redirect.SourceUrl,
                                RedirectType = redirect.RedirectType,
                                IsCompetitor = false,
                                ConfidenceScore = 0,
                                Reasoning = "Failed to analyze",
                                Industry = "Unknown",
                                SimilarServices = new List<string>()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error analyzing competitor for {redirect.ExternalUrl}: {ex.Message}");
                }

                await Task.Delay(4000);
            }
            finalCompetitorList = competitorAnalysis
            .Where(c => c.IsCompetitor)
            .ToList();

            // For DB storage
            competitorCount = finalCompetitorList.Count;
            competitorLinks = finalCompetitorList.Select(c => c.ExternalUrl).ToList();


            return (competitorAnalysis, competitorCount, competitorLinks);
        }

        private async Task<string> CallGroqAPI(string prompt)
        {
            try
            {
                var requestBody = new
                {
                    messages = new[]
                    {
                        new { role = "user", content = prompt }
                    },
                    model = "meta-llama/llama-4-scout-17b-16e-instruct",
                    temperature = 0.1,
                    max_tokens = 1000
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {GROQ_API_KEY}");

                var response = await _httpClient.PostAsync(GROQ_API_URL, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var groqResponse = JsonSerializer.Deserialize<GroqApiResponse>(responseContent);
                    return groqResponse.Choices?.FirstOrDefault()?.Message?.Content ?? "";
                }
                else
                {
                    Console.WriteLine($"Groq API error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
                    return "";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calling Groq API: {ex.Message}");
                return "";
            }
        }

        private async Task DetectExternalRedirects(IPage page, string currentUrl, string baseUrl, List<ExternalRedirectData> externalRedirects)
        {
            try
            {
                var externalLinks = await page.EvaluateExpressionAsync<ExternalLinkInfo[]>(@"
                    (() => {
                        const baseOrigin = window.location.origin;
                        const alternativeOrigin = baseOrigin.includes('www.') ? 
                            baseOrigin.replace('www.', '') : 
                            baseOrigin.replace('://', '://www.');
                        
                        const externalLinks = [];
                        
                        document.querySelectorAll('a[href]').forEach(a => {
                            const href = a.href;
                            if (href && !href.startsWith(baseOrigin) && !href.startsWith(alternativeOrigin) && 
                                (href.startsWith('http://') || href.startsWith('https://'))) {
                                externalLinks.push({
                                    url: href,
                                    type: 'link',
                                    text: a.innerText || a.title || '',
                                    context: a.outerHTML.substring(0, 200)
                                });
                            }
                        });

                        document.querySelectorAll('img[src]').forEach(img => {
                        const src = img.src;
                        if (src && !src.startsWith(baseOrigin) && !src.startsWith(alternativeOrigin) && 
                            (src.startsWith('http://') || src.startsWith('https://'))) {
                            externalLinks.push({
                                url: src,
                                type: 'image',
                                text: img.alt || img.title || '',
                                context: img.outerHTML.substring(0, 200)
                            });
                        }
                    });
                        
                        document.querySelectorAll('iframe[src]').forEach(iframe => {
                        const src = iframe.src;
                        if (src && !src.startsWith(baseOrigin) && !src.startsWith(alternativeOrigin) && 
                            (src.startsWith('http://') || src.startsWith('https://'))) {
                            externalLinks.push({
                                url: src,
                                type: 'iframe',
                                text: iframe.title || '',
                                context: iframe.outerHTML.substring(0, 200)
                            });
                        }
                    });

                        return externalLinks;
                    })()
                ");

                foreach (var linkInfo in externalLinks)
                {
                    try
                    {
                        var uri = new Uri(linkInfo.Url);
                        var domain = uri.Host;

                        if (!externalRedirects.Any(r => r.ExternalUrl == linkInfo.Url && r.SourceUrl == currentUrl))
                        {
                            externalRedirects.Add(new ExternalRedirectData
                            {
                                SourceUrl = currentUrl,
                                ExternalUrl = linkInfo.Url,
                                ExternalDomain = domain,
                                RedirectType = linkInfo.Type,
                                LinkText = linkInfo.Text,
                                Context = linkInfo.Context
                            });

                            Console.WriteLine($"🔗 External redirect detected: {linkInfo.Type} -> {domain}");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error parsing external URL {linkInfo.Url}: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error detecting external redirects on {currentUrl}: {ex.Message}");
            }
        }

        private async Task<string[]> GetInternalLinks(IPage page, string baseUrl)
        {
            return await page.EvaluateExpressionAsync<string[]>(@"
                (() => {
                    const baseOrigin = window.location.origin;
                    const alternativeOrigin = baseOrigin.includes('www.') ? 
                        baseOrigin.replace('www.', '') : 
                        baseOrigin.replace('://', '://www.');
                    const allLinks = new Set();
                    
                    document.querySelectorAll('a[href]').forEach(a => {
                        const href = a.href;
                        if (href && (href.startsWith(baseOrigin) || href.startsWith(alternativeOrigin))) {
                            allLinks.add(href);
                        }
                    });
                    
                    return Array.from(allLinks);
                })()
            ");
        }

        private async Task<string> TakeScreenshot(IPage page, string context)
        {
            try
            {
                await Task.Delay(2000);
                var screenshotBytes = await page.ScreenshotDataAsync(new ScreenshotOptions
                {
                    Type = ScreenshotType.Png,
                    FullPage = true
                });
                var base64 = Convert.ToBase64String(screenshotBytes);
                return "data:image/png;base64," + base64;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Screenshot failed for {context}: {ex.Message}");
                return null;
            }
        }

        // FIXED: Enhanced navigation path capture
        private async Task<List<PathStepData>> CaptureNavigationPath(IPage page, string targetUrl, Dictionary<string, string> parentMap,
            Dictionary<string, string> originalUrlMap, string baseUrl, string targetName)
        {
            var pathScreenshots = new List<PathStepData>();

            if (!targetUrl.ToLower().Contains($"/{targetName.ToLower()}"))
            {
                return pathScreenshots;
            }

            var normalizedTarget = NormalizeUrl(targetUrl);
            var path = BuildPathFromParentMap(normalizedTarget, parentMap, originalUrlMap);

            Console.WriteLine($"🛤️ Capturing navigation path with {path.Count} steps for {targetUrl}");

            if (path.Count == 0)
            {
                return pathScreenshots;
            }

            // Capture each step in the path
            for (int i = 0; i < path.Count; i++)
            {
                var stepUrl = path[i];
                try
                {
                    Console.WriteLine($"📸 Capturing step {i + 1}/{path.Count}: {stepUrl}");

                    await page.GoToAsync(stepUrl, new NavigationOptions
                    {
                        Timeout = 15000,
                        WaitUntil = new[] { WaitUntilNavigation.Networkidle2 }
                    });
                    await Task.Delay(3000);

                    var screenshot = await TakeScreenshot(page, $"Step {i + 1}");

                    if (!string.IsNullOrEmpty(screenshot))
                    {
                        pathScreenshots.Add(new PathStepData
                        {
                            StepNumber = i + 1,
                            Url = stepUrl,
                            Screenshot = screenshot,
                            IsTargetPage = NormalizeUrl(stepUrl).Equals(NormalizeUrl(targetUrl), StringComparison.OrdinalIgnoreCase)
                        });
                        Console.WriteLine($"✅ Step {i + 1} screenshot captured successfully");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error capturing screenshot for step {i + 1} ({stepUrl}): {ex.Message}");
                    pathScreenshots.Add(new PathStepData
                    {
                        StepNumber = i + 1,
                        Url = stepUrl,
                        Screenshot = null,
                        IsTargetPage = NormalizeUrl(stepUrl).Equals(NormalizeUrl(targetUrl), StringComparison.OrdinalIgnoreCase)
                    });
                }
            }

            Console.WriteLine($"🎯 Navigation path capture completed: {pathScreenshots.Count} screenshots captured");
            foreach (var step in pathScreenshots)
            {
                Console.WriteLine($"🧭 Path step stored: {step.Url}, isTarget: {step.IsTargetPage}");
            }
            return pathScreenshots;
        }

        private List<string> BuildPathFromParentMap(string targetUrl, Dictionary<string, string> parentMap, Dictionary<string, string> originalUrlMap)
        {
            var path = new List<string>();
            var normalizedTarget = NormalizeUrl(targetUrl);
            var current = normalizedTarget;
            var visited = new HashSet<string>();

            while (current != null && !visited.Contains(current))
            {
                visited.Add(current);
                var originalUrl = originalUrlMap.ContainsKey(current) ? originalUrlMap[current] : current;
                path.Insert(0, originalUrl);
                current = parentMap.ContainsKey(current) ? parentMap[current] : null;
            }

            return path;
        }


        public async Task<ScanResult> ScanAsync(string url, string target)
        {
            var crawlResult = await _crawler.CrawlAsync(url, target);
            //  Convert UTC to IST properly
            TimeZoneInfo indiaTimeZone;

            try
            {
                indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"); // ✅ For Windows
            }
            catch
            {
                indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Kolkata"); // ✅ For Linux/Mac
            }

            DateTime indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, indiaTimeZone);

            return new ScanResult
            {
                Website = crawlResult.Website,
                TargetName = crawlResult.TargetName,
                Found = crawlResult.Found,
                MatchedPageUrl = crawlResult.MatchedPageUrl,
                ScreenshotBase64 = crawlResult.ScreenshotBase64,
                ScannedAt = DateTime.UtcNow,
                IsMatchedUrlLive = crawlResult.IsMatchedUrlLive,
                CompetitorCount = crawlResult.CompetitorCount,
                CompetitorLinksJson = JsonSerializer.Serialize(crawlResult.CompetitorLinks)
            };
        }



        // Helper methods
        private string GetBaseUrl(string fullUrl)
        {
            if (!fullUrl.StartsWith("http://") && !fullUrl.StartsWith("https://"))
                fullUrl = "https://" + fullUrl;
            var uri = new Uri(fullUrl);
            return $"{uri.Scheme}://{uri.Host}";
        }

        private string NormalizeUrl(string url)
        {
            try
            {
                var uri = new Uri(url);
                var normalized = $"{uri.Scheme}://{uri.Host}{uri.AbsolutePath}";
                if (normalized.EndsWith("/") && normalized.Length > 1)
                    normalized = normalized.TrimEnd('/');
                return normalized;
            }
            catch
            {
                return url;
            }
        }

        private bool IsExactTargetMatch(string content, string target)
        {
            if (string.IsNullOrEmpty(content) || string.IsNullOrEmpty(target))
                return false;
            var pattern = $@"\b{Regex.Escape(target)}\b";
            return Regex.IsMatch(content, pattern, RegexOptions.IgnoreCase);
        }

        private async Task<bool> CheckTargetInElements(IPage page, string target)
        {
            try
            {
                return await page.EvaluateFunctionAsync<bool>(@"
                    (target) => {
                        const elements = document.querySelectorAll('*');
                        const targetRegex = new RegExp('\\b' + target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                        for (let el of elements) {
                            const text = (el.innerText || '').toLowerCase();
                            const alt = (el.alt || '').toLowerCase();
                            const title = (el.title || '').toLowerCase();
                            const placeholder = (el.placeholder || '').toLowerCase();
                            const href = (el.href || '').toLowerCase();
                            if (targetRegex.test(text) || targetRegex.test(alt) || 
                                targetRegex.test(title) || targetRegex.test(placeholder) ||
                                href.includes('/' + target.toLowerCase() + '/') ||
                                href.includes('/' + target.toLowerCase())) {
                                return true;
                            }
                        }
                        return false;
                    }
                ", target);
            }
            catch
            {
                return false;
            }
        }

    }

    // Data models (you'll need to add these to your Models folder)
    public class ExternalRedirectData
    {
        public string SourceUrl { get; set; } = "";
        public string ExternalUrl { get; set; } = "";
        public string ExternalDomain { get; set; } = "";
        public string RedirectType { get; set; } = "";
        public string LinkText { get; set; } = "";
        public string Context { get; set; } = "";
        public string Url { get; set; } = "";
    }

    public class CompetitorData
    {
        public string ExternalUrl { get; set; } = "";
        public string SourceUrl { get; set; } = "";
        public string RedirectType { get; set; } = "";
        public bool IsCompetitor { get; set; }
        public int ConfidenceScore { get; set; }
        public string Reasoning { get; set; } = "";
        public string Industry { get; set; } = "";
        public string Name { get; set; } = "";
        public List<string> SimilarServices { get; set; } = new List<string>();
    }

    public class ExternalLinkInfo
    {
        public string Url { get; set; } = "";
        public string Type { get; set; } = "";
        public string Text { get; set; } = "";
        public string Context { get; set; } = "";
    }

    public class CompetitorAnalysisResponse
    {
        public bool IsCompetitor { get; set; }
        public int ConfidenceScore { get; set; }
        public string Reasoning { get; set; } = "";
        public string Industry { get; set; } = "";
        public List<string> SimilarServices { get; set; } = new List<string>();
    }

    public class GroqApiResponse
    {
        public List<GroqChoice> Choices { get; set; } = new List<GroqChoice>();
    }

    public class GroqChoice
    {
        public GroqMessage Message { get; set; } = new GroqMessage();
    }

    public class GroqMessage
    {
        public string Content { get; set; } = "";
    }

    public class PathStepData
    {
        public int StepNumber { get; set; }
        public string Url { get; set; } = "";
        public string Screenshot { get; set; } = "";
        public bool IsTargetPage { get; set; }
    }

    public class NavigationPathData
    {
        public string TargetUrl { get; set; } = "";
        public List<PathStepData> NavigationSteps { get; set; } = new List<PathStepData>();
    }



}
