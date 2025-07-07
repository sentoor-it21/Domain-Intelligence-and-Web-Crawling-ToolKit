using System;
namespace ScreenshotAPI.Models;

public class ScanResult
{
    public int Id { get; set; }
    public string Website { get; set; } = "";
    public string TargetName { get; set; } = "";
    public bool Found { get; set; }
    public string? MatchedPageUrl { get; set; }
    public string? ScreenshotBase64 { get; set; }
    public DateTime ScannedAt { get; set; }

    public bool? IsMatchedUrlLive { get; set; }

    public int CompetitorCount { get; set; }
    public string CompetitorLinksJson { get; set; } 
}