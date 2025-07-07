using ScreenshotAPI.Models;
using System.Text.Json;
namespace ScreenshotAPI.Services
{
    public class WebsiteScannerService
    {
        private readonly IWebsiteCrawler _crawler;

        public WebsiteScannerService(IWebsiteCrawler crawler)
        {
            _crawler = crawler;
        }

        public async Task<ScanResult> ScanAsync(string url, string target)
        {
            var crawlResult = await _crawler.CrawlAsync(url, target);

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
    }
}
