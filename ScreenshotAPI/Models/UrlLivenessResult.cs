namespace ScreenshotAPI.Models
{
    public class UrlLivenessResult
    {
        public string Url { get; set; }
        public bool IsLive { get; set; }
        public int StatusCode { get; set; }
        public string StatusDescription { get; set; }
        public DateTime CheckedAt { get; set; }
    }
}
