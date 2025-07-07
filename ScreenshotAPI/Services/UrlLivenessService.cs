using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ScreenshotAPI.Models;

namespace ScreenshotAPI.Services
{
    public class UrlLivenessService
    {
        public async Task<UrlLivenessResult> CheckUrlLivenessAsync(string url)
        {
            try
            {
                using var httpClient = new HttpClient();
                httpClient.Timeout = TimeSpan.FromSeconds(30);

                httpClient.DefaultRequestHeaders.Add("User-Agent",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36");

                var response = await httpClient.GetAsync(url);

                return new UrlLivenessResult
                {
                    Url = url,
                    IsLive = response.IsSuccessStatusCode,
                    StatusCode = (int)response.StatusCode,
                    StatusDescription = response.ReasonPhrase,
                    CheckedAt = DateTime.Now
                };
            }
            catch
            {
                return new UrlLivenessResult
                {
                    Url = url,
                    IsLive = false,
                    StatusCode = 0,
                    StatusDescription = "Failed",
                    CheckedAt = DateTime.Now
                };
            }
        }
    }
}
