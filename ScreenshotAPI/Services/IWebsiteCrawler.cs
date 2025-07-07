using System.Threading.Tasks;
using ScreenshotAPI.Models;
namespace ScreenshotAPI.Services
{
    public interface IWebsiteCrawler
    {
        Task<CrawlResult> CrawlAsync(string url, string targetName);
    }
}
