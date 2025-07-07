// using Microsoft.AspNetCore.Mvc;
// using PuppeteerSharp;
// using System.Text.Json;
// using System.Text.RegularExpressions;
// using System.Net.Http;
// using System.Text;

// [ApiController]
// [Route("api/[controller]")]
// public class TrackController : ControllerBase
// {
//     private readonly HttpClient _httpClient;
//     private const string GROQ_API_KEY = "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"; // Replace with your actual API key
//     private const string GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

//     public TrackController()
//     {
//         _httpClient = new HttpClient();
//     }

//     [HttpPost]
//     public async Task<IActionResult> Post([FromBody] TrackRequest request)
//     {
//         try
//         {
//             Console.WriteLine($"Received request - URL: {request.Url}, Target: {request.TargetName}");
//             if (string.IsNullOrEmpty(request.Url) || string.IsNullOrEmpty(request.TargetName))
//                 return BadRequest(new { error = "URL and Target Name are required" });

//             var baseUrl = GetBaseUrl(request.Url);
//             Console.WriteLine($"Base URL extracted: {baseUrl}");

//             var foundUrls = new List<string>();
//             var foundUrlsWithNavigationPath = new List<NavigationPathData>();
//             var externalRedirects = new List<ExternalRedirectData>(); // NEW: Track external redirects
//             var competitorAnalysis = new List<CompetitorData>(); // NEW: Store competitor analysis

//             var browserFetcher = new BrowserFetcher();
//             await browserFetcher.DownloadAsync();

//             var launchOptions = new LaunchOptions
//             {
//                 Headless = false,
//                 Args = new[]
//                 {
//                     "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage",
//                     "--disable-extensions", "--disable-gpu", "--disable-web-security", "--allow-running-insecure-content"
//                 }
//             };

//             using var browser = await Puppeteer.LaunchAsync(launchOptions);
//             using var page = await browser.NewPageAsync();
//             await page.SetViewportAsync(new ViewPortOptions { Width = 1366, Height = 768 });
//             await page.SetUserAgentAsync("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

//             Console.WriteLine($"Navigating to base URL: {baseUrl}");
//             await page.GoToAsync(baseUrl, new NavigationOptions { Timeout = 30000, WaitUntil = new[] { WaitUntilNavigation.Networkidle2 } });
//             await Task.Delay(3000);

//             Console.WriteLine("Starting enhanced search with competitor detection...");
//             var visited = new HashSet<string>();
//             var normalizedVisited = new HashSet<string>();
//             var parentMap = new Dictionary<string, string>();
//             var originalUrlMap = new Dictionary<string, string>();

//             // Do DFS traversal with external redirect detection
//             await IterativeDfsTraverse(page, baseUrl, request.TargetName.ToLower(), visited, normalizedVisited,
//                 foundUrls, foundUrlsWithNavigationPath, baseUrl, parentMap, originalUrlMap, externalRedirects);

//             // NEW: Analyze competitors using AI
//             if (externalRedirects.Count > 0)
//             {
//                 Console.WriteLine($"Found {externalRedirects.Count} external redirects. Analyzing competitors...");
//                 competitorAnalysis = await AnalyzeCompetitors(request.TargetName, externalRedirects);
//             }

//             var result = new
//             {
//                 foundUrls = foundUrls.ToArray(),
//                 foundUrlsWithNavigationPath = foundUrlsWithNavigationPath.ToArray(),
//                 foundCount = foundUrls.Count,
//                 message = foundUrls.Count > 0 ? $"Target found on {foundUrls.Count} pages!" : "Target not found in accessible pages",
//                 searchedPages = normalizedVisited.Count,
//                 externalRedirects = externalRedirects.ToArray(), // NEW: Include external redirects
//                 competitorAnalysis = competitorAnalysis.ToArray() // NEW: Include competitor analysis
//             };

//             Console.WriteLine($"Search completed. Pages visited: {normalizedVisited.Count}, Target found: {foundUrls.Count}, External redirects: {externalRedirects.Count}, Competitors detected: {competitorAnalysis.Count(c => c.IsCompetitor)}");

//             return Ok(result);
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine($"Error: {ex.Message}");
//             return StatusCode(500, new { error = ex.Message });
//         }
//     }

//     // NEW: Analyze competitors using Groq AI
//     private async Task<List<CompetitorData>> AnalyzeCompetitors(string targetCompany, List<ExternalRedirectData> externalRedirects)
//     {
//         var competitorAnalysis = new List<CompetitorData>();

//         foreach (var redirect in externalRedirects)
//         {
//             try
//             {
//                 var prompt = $@"
// Analyze if the website '{redirect.ExternalUrl}' is a competitor to '{targetCompany}'.

// Consider the following factors:
// 1. Do they offer similar products/services?
// 2. Do they target the same market/audience?
// 3. Are they in the same industry?
// 4. Would customers choose between these two companies?

// Respond in JSON format:
// {{
//     ""isCompetitor"": true/false,
//     ""confidenceScore"": 0-100,
//     ""reasoning"": ""brief explanation"",
//     ""industry"": ""detected industry"",
//     ""similarServices"": [""list of similar services if any""]
// }}

// Be accurate and provide only factual analysis.";

//                 var groqResponse = await CallGroqAPI(prompt);

//                 if (!string.IsNullOrEmpty(groqResponse))
//                 {
//                     try
//                     {
//                         var analysis = JsonSerializer.Deserialize<CompetitorAnalysisResponse>(groqResponse);

//                         competitorAnalysis.Add(new CompetitorData
//                         {
//                             ExternalUrl = redirect.ExternalUrl,
//                             SourceUrl = redirect.SourceUrl,
//                             RedirectType = redirect.RedirectType,
//                             IsCompetitor = analysis.IsCompetitor,
//                             ConfidenceScore = analysis.ConfidenceScore,
//                             Reasoning = analysis.Reasoning,
//                             Industry = analysis.Industry,
//                             SimilarServices = analysis.SimilarServices
//                         });


//                         Console.WriteLine($"✅ Analyzed {redirect.ExternalUrl} - Competitor: {analysis.IsCompetitor} (Confidence: {analysis.ConfidenceScore}%)");
//                     }
//                     catch (JsonException)
//                     {
//                         // Fallback if JSON parsing fails
//                         competitorAnalysis.Add(new CompetitorData
//                         {
//                             ExternalUrl = redirect.ExternalUrl,
//                             SourceUrl = redirect.SourceUrl,
//                             RedirectType = redirect.RedirectType,
//                             IsCompetitor = false,
//                             ConfidenceScore = 0,
//                             Reasoning = "Failed to analyze",
//                             Industry = "Unknown",
//                             SimilarServices = new List<string>()
//                         });
//                     }
//                 }
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"Error analyzing competitor for {redirect.ExternalUrl}: {ex.Message}");
//             }

//             // Add delay to avoid rate limiting
//             await Task.Delay(1000);
//         }

//         return competitorAnalysis;
//     }

//     // NEW: Call Groq AI API
//     private async Task<string> CallGroqAPI(string prompt)
//     {
//         try
//         {
//             var requestBody = new
//             {
//                 messages = new[]
//                 {
//                     new { role = "user", content = prompt }
//                 },
//                 model = "meta-llama/llama-4-scout-17b-16e-instruct", // You can change this to other Groq models
//                 temperature = 0.1,
//                 max_tokens = 1000
//             };

//             var json = JsonSerializer.Serialize(requestBody);
//             var content = new StringContent(json, Encoding.UTF8, "application/json");

//             _httpClient.DefaultRequestHeaders.Clear();
//             _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {GROQ_API_KEY}");

//             var response = await _httpClient.PostAsync(GROQ_API_URL, content);

//             if (response.IsSuccessStatusCode)
//             {
//                 var responseContent = await response.Content.ReadAsStringAsync();
//                 var groqResponse = JsonSerializer.Deserialize<GroqApiResponse>(responseContent);
//                 return groqResponse.Choices?.FirstOrDefault()?.Message?.Content ?? "";
//             }
//             else
//             {
//                 Console.WriteLine($"Groq API error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
//                 return "";
//             }
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine($"Error calling Groq API: {ex.Message}");
//             return "";
//         }
//     }

//     // ENHANCED: Detect external redirects during DFS traversal
//     private async Task IterativeDfsTraverse(IPage page, string startUrl, string target, HashSet<string> visited, HashSet<string> normalizedVisited, List<string> foundUrls,
//         List<NavigationPathData> foundUrlsWithNavigationPath, string baseUrl, Dictionary<string, string> parentMap, 
//         Dictionary<string, string> originalUrlMap, List<ExternalRedirectData> externalRedirects)
//     {
//         var stack = new Stack<string>();
//         var depthMap = new Dictionary<string, int>();
//         stack.Push(startUrl);
//         depthMap[NormalizeUrl(startUrl)] = 0;
//         originalUrlMap[NormalizeUrl(statUrl)] = startUrl;

//         while (stack.Count > 0 && normalizedVisited.Count < 500)
//         {
//             var currentUrl = stack.Pop();
//             var normalizedCurrent = NormalizeUrl(currentUrl);
//             var currentDepth = depthMap.ContainsKey(normalizedCurrent) ? depthMap[normalizedCurrent] : 0;

//             if (currentDepth > 5 || normalizedVisited.Contains(normalizedCurrent))
//             {
//                 continue;
//             }

//             visited.Add(currentUrl);
//             normalizedVisited.Add(normalizedCurrent);
//             originalUrlMap[normalizedCurrent] = currentUrl;

//             Console.WriteLine($"Visiting page {normalizedVisited.Count}: {currentUrl} (depth: {currentDepth})");

//             try
//             {
//                 await page.GoToAsync(currentUrl, new NavigationOptions
//                 {
//                     Timeout = 15000,
//                     WaitUntil = new[] { WaitUntilNavigation.Networkidle2 }
//                 });
//                 await Task.Delay(2000);

//                 // Check for target content
//                 var pageContent = await page.EvaluateExpressionAsync<string>("document.body.innerText.toLowerCase()");
//                 var hasTargetInText = IsExactTargetMatch(pageContent, target);
//                 var hasTargetInElements = await CheckTargetInElements(page, target);

//                 if (hasTargetInText || hasTargetInElements)
//                 {
//                     Console.WriteLine($"✅ TARGET FOUND on page: {currentUrl}");
//                     if (!foundUrls.Contains(currentUrl))
//                     {
//                         foundUrls.Add(currentUrl);
//                     }

//                     if (currentUrl.ToLower().Contains($"/{target.ToLower()}"))
//                     {
//                         var pathScreenshots = await CaptureNavigationPath(page, currentUrl, parentMap, originalUrlMap, baseUrl, target);
//                         if (pathScreenshots.Count > 0)
//                         {
//                             foundUrlsWithNavigationPath.Add(new NavigationPathData
//                             {
//                                 TargetUrl = currentUrl,
//                                 NavigationSteps = pathScreenshots
//                             });
//                         }
//                     }
//                 }

//                 // NEW: Detect external redirects
//                 await DetectExternalRedirects(page, currentUrl, baseUrl, externalRedirects);

//                 // Get internal links for continued traversal
//                 var links = await GetInternalLinks(page, baseUrl);
//                 Console.WriteLine($"Found {links.Length} unique internal links to explore");

//                 for (int i = links.Length - 1; i >= 0; i--)
//                 {
//                     var link = links[i];
//                     var normalizedLink = NormalizeUrl(link);

//                     if (!parentMap.ContainsKey(normalizedLink) && !normalizedVisited.Contains(normalizedLink))
//                     {
//                         parentMap[normalizedLink] = normalizedCurrent;
//                         depthMap[normalizedLink] = currentDepth + 1;
//                         stack.Push(link);
//                     }
//                 }
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"Error processing page {currentUrl}: {ex.Message}");
//             }
//         }
//     }

//     // NEW: Detect external redirects on current page
//     private async Task DetectExternalRedirects(IPage page, string currentUrl, string baseUrl, List<ExternalRedirectData> externalRedirects)
//     {
//         try
//         {
//             // Get all external links, images, and other external resources
//             var externalLinks = await page.EvaluateExpressionAsync<ExternalLinkInfo[]>(@"
//                 (() => {
//                     const baseOrigin = window.location.origin;
//                     const alternativeOrigin = baseOrigin.includes('www.') ? 
//                         baseOrigin.replace('www.', '') : 
//                         baseOrigin.replace('://', '://www.');

//                     const externalLinks = [];

//                     // Check anchor tags
//                     document.querySelectorAll('a[href]').forEach(a => {
//                         const href = a.href;
//                         if (href && !href.startsWith(baseOrigin) && !href.startsWith(alternativeOrigin) && 
//                             (href.startsWith('http://') || href.startsWith('https://'))) {
//                             externalLinks.push({
//                                 url: href,
//                                 type: 'link',
//                                 text: a.innerText || a.title || '',
//                                 context: a.outerHTML.substring(0, 200)
//                             });
//                         }
//                     });

//                     // Check images with external sources
//                     document.querySelectorAll('img[src]').forEach(img => {
//                         const src = img.src;
//                         if (src && !src.startsWith(baseOrigin) && !src.startsWith(alternativeOrigin) && 
//                             (src.startsWith('http://') || src.startsWith('https://'))) {
//                             externalLinks.push({
//                                 url: src,
//                                 type: 'image',
//                                 text: img.alt || img.title || '',
//                                 context: img.outerHTML.substring(0, 200)
//                             });
//                         }
//                     });

//                     // Check iframes
//                     document.querySelectorAll('iframe[src]').forEach(iframe => {
//                         const src = iframe.src;
//                         if (src && !src.startsWith(baseOrigin) && !src.startsWith(alternativeOrigin) && 
//                             (src.startsWith('http://') || src.startsWith('https://'))) {
//                             externalLinks.push({
//                                 url: src,
//                                 type: 'iframe',
//                                 text: iframe.title || '',
//                                 context: iframe.outerHTML.substring(0, 200)
//                             });
//                         }
//                     });

//                     return externalLinks;
//                 })()
//             ");

//             foreach (var linkInfo in externalLinks)
//             {
//                 // Extract domain from external URL
//                 try
//                 {
//                     var uri = new Uri(linkInfo.Url);
//                     var domain = uri.Host;

//                     // Avoid duplicates
//                     if (!externalRedirects.Any(r => r.ExternalUrl == linkInfo.Url && r.SourceUrl == currentUrl))
//                     {
//                         externalRedirects.Add(new ExternalRedirectData
//                         {
//                             SourceUrl = currentUrl,
//                             ExternalUrl = linkInfo.Url,
//                             ExternalDomain = domain,
//                             RedirectType = linkInfo.Type,
//                             LinkText = linkInfo.Text,
//                             Context = linkInfo.Context
//                         });

//                         Console.WriteLine($"🔗 External redirect detected: {linkInfo.Type} -> {domain}");
//                     }
//                 }
//                 catch (Exception ex)
//                 {
//                     Console.WriteLine($"Error parsing external URL {linkInfo.Url}: {ex.Message}");
//                 }
//             }
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine($"Error detecting external redirects on {currentUrl}: {ex.Message}");
//         }
//     }

//     // Helper method to get internal links
//     private async Task<string[]> GetInternalLinks(IPage page, string baseUrl)
//     {
//         return await page.EvaluateExpressionAsync<string[]>(@"
//             (() => {
//                 const baseOrigin = window.location.origin;
//                 const alternativeOrigin = baseOrigin.includes('www.') ? 
//                     baseOrigin.replace('www.', '') : 
//                     baseOrigin.replace('://', '://www.');
//                 const allLinks = new Set();

//                 document.querySelectorAll('a[href]').forEach(a => {
//                     const href = a.href;
//                     if (href && (href.startsWith(baseOrigin) || href.startsWith(alternativeOrigin))) {
//                         allLinks.add(href);
//                     }
//                 });

//                 return Array.from(allLinks);
//             })()
//         ");
//     }

//     // ... (keeping all existing helper methods like GetBaseUrl, NormalizeUrl, IsExactTargetMatch, etc.)

//     private string GetBaseUrl(string fullUrl)
//     {
//         if (!fullUrl.StartsWith("http://") && !fullUrl.StartsWith("https://"))
//             fullUrl = "https://" + fullUrl;
//         var uri = new Uri(fullUrl);
//         return $"{uri.Scheme}://{uri.Host}";
//     }

//     private string NormalizeUrl(string url)
//     {
//         try
//         {
//             var uri = new Uri(url);
//             var normalized = $"{uri.Scheme}://{uri.Host}{uri.AbsolutePath}";
//             if (normalized.EndsWith("/") && normalized.Length > 1)
//                 normalized = normalized.TrimEnd('/');
//             return normalized;
//         }
//         catch
//         {
//             return url;
//         }
//     }

//     private bool IsExactTargetMatch(string content, string target)
//     {
//         if (string.IsNullOrEmpty(content) || string.IsNullOrEmpty(target))
//             return false;
//         var pattern = $@"\b{Regex.Escape(target)}\b";
//         return Regex.IsMatch(content, pattern, RegexOptions.IgnoreCase);
//     }

//     private async Task<bool> CheckTargetInElements(IPage page, string target)
//     {
//         try
//         {
//             return await page.EvaluateFunctionAsync<bool>(@"
//                 (target) => {
//                     const elements = document.querySelectorAll('*');
//                     const targetRegex = new RegExp('\\b' + target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
//                     for (let el of elements) {
//                         const text = (el.innerText || '').toLowerCase();
//                         const alt = (el.alt || '').toLowerCase();
//                         const title = (el.title || '').toLowerCase();
//                         const placeholder = (el.placeholder || '').toLowerCase();
//                         const href = (el.href || '').toLowerCase();
//                         if (targetRegex.test(text) || targetRegex.test(alt) || 
//                             targetRegex.test(title) || targetRegex.test(placeholder) ||
//                             href.includes('/' + target.toLowerCase() + '/') ||
//                             href.includes('/' + target.toLowerCase())) {
//                             return true;
//                         }
//                     }
//                     return false;
//                 }
//             ", target);
//         }
//         catch
//         {
//             return false;
//         }
//     }

//     private async Task<string> TakeScreenshot(IPage page, string context)
//     {
//         try
//         {
//             await Task.Delay(2000);
//             var screenshotBytes = await page.ScreenshotDataAsync(new ScreenshotOptions
//             {
//                 Type = ScreenshotType.Png,
//                 FullPage = true
//             });
//             var base64 = Convert.ToBase64String(screenshotBytes);
//             return "data:image/png;base64," + base64;
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine($"Screenshot failed for {context}: {ex.Message}");
//             return null;
//         }
//     }

//     private async Task<List<PathStepData>> CaptureNavigationPath(IPage page, string targetUrl, Dictionary<string, string> parentMap, 
//         Dictionary<string, string> originalUrlMap, string baseUrl, string targetName)
//     {
//         var pathScreenshots = new List<PathStepData>();

//         if (!targetUrl.ToLower().Contains($"/{targetName.ToLower()}"))
//         {
//             return pathScreenshots;
//         }

//         var normalizedTarget = NormalizeUrl(targetUrl);
//         var path = BuildPathFromParentMap(normalizedTarget, parentMap, originalUrlMap);

//         if (path.Count == 0)
//         {
//             return pathScreenshots;
//         }

//         for (int i = 0; i < path.Count; i++)
//         {
//             var stepUrl = path[i];
//             try
//             {
//                 await page.GoToAsync(stepUrl, new NavigationOptions
//                 {
//                     Timeout = 15000,
//                     WaitUntil = new[] { WaitUntilNavigation.Networkidle2 }
//                 });
//                 await Task.Delay(3000);

//                 var screenshot = await TakeScreenshot(page, $"Step {i + 1}");

//                 pathScreenshots.Add(new PathStepData
//                 {
//                     StepNumber = i + 1,
//                     Url = stepUrl,
//                     Screenshot = screenshot,
//                     IsTargetPage = NormalizeUrl(stepUrl).Equals(NormalizeUrl(targetUrl), StringComparison.OrdinalIgnoreCase)
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"Error capturing screenshot for {stepUrl}: {ex.Message}");
//                 pathScreenshots.Add(new PathStepData
//                 {
//                     StepNumber = i + 1,
//                     Url = stepUrl,
//                     Screenshot = null,
//                     IsTargetPage = NormalizeUrl(stepUrl).Equals(NormalizeUrl(targetUrl), StringComparison.OrdinalIgnoreCase)
//                 });
//             }
//         }

//         return pathScreenshots;
//     }

//     private List<string> BuildPathFromParentMap(string targetUrl, Dictionary<string, string> parentMap, Dictionary<string, string> originalUrlMap)
//     {
//         var path = new List<string>();
//         var normalizedTarget = NormalizeUrl(targetUrl);
//         var current = normalizedTarget;
//         var visited = new HashSet<string>();

//         while (current != null && !visited.Contains(current))
//         {
//             visited.Add(current);
//             var originalUrl = originalUrlMap.ContainsKey(current) ? originalUrlMap[current] : current;
//             path.Insert(0, originalUrl);
//             current = parentMap.ContainsKey(current) ? parentMap[current] : null;
//         }

//         return path;
//     }
// }

// // NEW: Data models for external redirects and competitor analysis
// public class ExternalRedirectData
// {
//     public string SourceUrl { get; set; } = "";
//     public string ExternalUrl { get; set; } = "";
//     public string ExternalDomain { get; set; } = "";
//     public string RedirectType { get; set; } = ""; // link, image, iframe
//     public string LinkText { get; set; } = "";
//     public string Context { get; set; } = "";
// }

// public class CompetitorData
// {
//     public string ExternalUrl { get; set; } = "";
//     public string SourceUrl { get; set; } = "";
//     public string RedirectType { get; set; } = "";
//     public bool IsCompetitor { get; set; }
//     public int ConfidenceScore { get; set; }
//     public string Reasoning { get; set; } = "";
//     public string Industry { get; set; } = "";
//     public List<string> SimilarServices { get; set; } = new List<string>();
// }

// public class ExternalLinkInfo
// {
//     public string Url { get; set; } = "";
//     public string Type { get; set; } = "";
//     public string Text { get; set; } = "";
//     public string Context { get; set; } = "";
// }

// public class CompetitorAnalysisResponse
// {
//     public bool IsCompetitor { get; set; }
//     public int ConfidenceScore { get; set; }
//     public string Reasoning { get; set; } = "";
//     public string Industry { get; set; } = "";
//     public List<string> SimilarServices { get; set; } = new List<string>();
// }

// public class GroqApiResponse
// {
//     public List<GroqChoice> Choices { get; set; } = new List<GroqChoice>();
// }

// public class GroqChoice
// {
//     public GroqMessage Message { get; set; } = new GroqMessage();
// }

// public class GroqMessage
// {
//     public string Content { get; set; } = "";
// }

// // Existing models
// public class PathStepData
// {
//     public int StepNumber { get; set; }
//     public string Url { get; set; } = "";
//     public string Screenshot { get; set; } = "";
//     public bool IsTargetPage { get; set; }
// }

// public class NavigationPathData
// {
//     public string TargetUrl { get; set; } = "";
//     public List<PathStepData> NavigationSteps { get; set; } = new List<PathStepData>();
// }

// public class TrackRequest
// {
//     public string Url { get; set; } = "";
//     public string TargetName { get; set; } = "";
// }




// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using System;
// using System.Linq;
// using System.Threading.Tasks;
// using ScreenshotAPI.Data;
// using ScreenshotAPI.Models;


// namespace ScreenshotAPI.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class TrackController : ControllerBase
//     {
//         private readonly WebsiteScannerService _scanner;
//         private readonly ScanDbContext _db;


//         public TrackController(ScanDbContext db)
//         {
//             _scanner = scanner;
//             _db = db;
//         }

//         // POST: api/track
//         [HttpPost]
//         public async Task<IActionResult> Post([FromBody] TrackRequest request)
//         {
//             try
//             {
//                 if (string.IsNullOrWhiteSpace(request.Url) || string.IsNullOrWhiteSpace(request.TargetName))
//                 {
//                     return BadRequest(new { error = "Url and TargetName are required." });
//                 }

//                 // Simulate scan logic (replace this with PuppeteerSharp or real logic)
//                 bool found = true; // For now, assume it's always found
//                 string matchedUrl = request.Url; // pretend match found at input URL
//                 string dummyScreenshot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"; // dummy image

//                 // Save to DB
//                 var result = new ScanResult
//                 {
//                     Website = request.Url,
//                     TargetName = request.TargetName,
//                     Found = true,
//                     MatchedPageUrl = request.Url,
//                     ScreenshotBase64 = "dummy",
//                     ScannedAt = DateTime.UtcNow
//                 };

//                 _db.ScanResults.Add(result);
//                 await _db.SaveChangesAsync();

//                 return Ok(new { message = "Scan completed", data = result });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { error = "Scan failed", details = ex.Message });
//             }
//         }

//         // GET: api/track/latest
//         [HttpGet("latest")]
//         public async Task<IActionResult> GetLatest()
//         {
//             try
//             {
//                 var latest = await _db.ScanResults
//                     .OrderByDescending(r => r.ScannedAt)
//                     .ToListAsync();

//                 return Ok(latest);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { error = "Failed to fetch scan results", details = ex.Message });
//             }
//         }
//     }
// }



using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScreenshotAPI.Data;
using ScreenshotAPI.Models;
using ScreenshotAPI.Services; //  Import the service namespace
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ScreenshotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrackController : ControllerBase
    {
        private readonly WebsiteScannerService _scanner;
        private readonly ScanDbContext _db;

        //  Fixed constructor to include WebsiteScannerService
        public TrackController(WebsiteScannerService scanner, ScanDbContext db)
        {
            _scanner = scanner;
            _db = db;
        }

        //  POST: api/track
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TrackRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Url) || string.IsNullOrWhiteSpace(request.TargetName))
                {
                    return BadRequest(new { error = "Url and TargetName are required." });
                }

                // Call actual scanning logic
                var result = await _scanner.ScanAsync(request.Url, request.TargetName);

                _db.ScanResults.Add(result);
                await _db.SaveChangesAsync();
                Console.WriteLine("🎉 ScanResult saved to DB.");
                Console.WriteLine($"🖼️ Screenshot (base64) exists: {(!string.IsNullOrEmpty(result.ScreenshotBase64))}");


                return Ok(new { message = "Scan completed", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Scan failed", details = ex.Message });
            }
            
        }

        //  GET: api/track/latest
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            try
            {
                var latest = await _db.ScanResults
                    .OrderByDescending(r => r.ScannedAt)
                    .ToListAsync();

                return Ok(latest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to fetch scan results", details = ex.Message });
            }
        }

    }
}
