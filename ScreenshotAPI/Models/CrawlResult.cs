namespace ScreenshotAPI.Models
{
    public class CrawlResult
    {
        public string Website { get; set; }
        public string TargetName { get; set; }

        public bool Found { get; set; }
        public string? MatchedPageUrl { get; set; }
        public string? ScreenshotBase64 { get; set; }

        public List<string> FoundUrls { get; set; } = new();

        public DateTime ScannedAt { get; set; }

    //  Add this line if not present
        public TimeSpan ProcessingTime { get; set; }

        public int SearchedPages { get; set; }

        public List<string> ExternalRedirects { get; set; } = new();
        public string CompetitorAnalysis { get; set; }

        public bool? IsMatchedUrlLive { get; set; }

        public int CompetitorCount { get; set; }
        public List<string> CompetitorLinks { get; set; }

        public string Error { get; set; } 
    }

}
