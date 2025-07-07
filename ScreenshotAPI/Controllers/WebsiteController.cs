using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using System.Text.RegularExpressions;
using DnsClient;
using System.Net.Sockets;


namespace YourDotNetApi.Controllers
{
    [ApiController]
    [Route("api/website")]
    public class WebsiteController : ControllerBase
    {
        private readonly HttpClient _httpClient = new();

        [HttpGet("html")]
        public async Task<IActionResult> GetHtml(string url)
        {
            try
            {
                var html = await _httpClient.GetStringAsync("https://" + url);
                return Content(html, "text/html");
            }
            catch
            {
                return BadRequest("Unable to fetch HTML.");
            }
        }

        [HttpGet("full-screenshot")]
        public async Task<IActionResult> GetFullScreenshot(string url)
        {
            try
            {
                // Download browser if not already z
                var browserFetcher = new BrowserFetcher();
                await browserFetcher.DownloadAsync();

                using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { 
                    Headless = true,
                    Args = new[] { "--no-sandbox", "--disable-setuid-sandbox" }
                });

                using var page = await browser.NewPageAsync();

                // Navigate  to URL and wait for page to load
                await page.GoToAsync(url);

                // Wait for content to load
                await Task.Delay(2000);

                // Set viewport size
                await page.SetViewportAsync(new ViewPortOptions { Width = 1280, Height = 800 });

                // Take full page screenshot
                var screenshotOptions = new ScreenshotOptions { 
                    FullPage = true,
                    Type = ScreenshotType.Png
                };

                var screenshot = await page.ScreenshotBase64Async(screenshotOptions);
                return Ok(screenshot);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to capture screenshot: {ex.Message}");
            }
        }

        [HttpGet("validate-email")]
        public async Task<IActionResult> ValidateEmail(string email)
        {
            if (!IsValidEmailFormat(email))
                return Ok("Invalid email format.");

            string domain = email.Split('@').Last();

            if (IsDisposableEmail(domain))
                return Ok("Disposable email detected.");

            bool hasMx = await HasValidMxRecord(domain);
            if (!hasMx)
                return Ok("Domain has no valid MX records.");

            // New: SMTP verification
            bool emailExists = await VerifyEmailExistenceAsync(email);
            if (!emailExists)
                return Ok("Email address doesn't exist.");

            return Ok("Email is valid.");
        }

        private bool IsValidEmailFormat(string email)
        {
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase);
        }

        private bool IsDisposableEmail(string domain)
        {
            var disposableDomains = new HashSet<string>
            {
                "mailinator.com", "tempmail.com", "10minutemail.com",
                "yopmail.com", "guerrillamail.com", "throwawaymail.com",
                "trashmail.com", "sharklasers.com", "getairmail.com",
                "firemailbox.club", "temp-mail.org", "fake-email.com"
            };
            return disposableDomains.Contains(domain.ToLower());
        }

        private async Task<bool> HasValidMxRecord(string domain)
        {
            try
            {
                var lookup = new LookupClient();
                var result = await lookup.QueryAsync(domain, QueryType.MX);
                return result.Answers.MxRecords().Any();
            }
            catch
            {
                return false;
            }
        }

        private async Task<bool> VerifyEmailExistenceAsync(string email)
        {
            try
            {
                // Extract domain from email
                string domain = email.Split('@')[1];

                // Get MX records
                var lookup = new LookupClient();
                var mxResult = await lookup.QueryAsync(domain, QueryType.MX);
                var mxRecords = mxResult.Answers.MxRecords().OrderBy(x => x.Preference).ToList();

                if (!mxRecords.Any())
                    return false;

                // Use the first MX record as the mail server
                var mailServer = mxRecords.First().Exchange.Value;

                // Connect to the mail server via SMTP
                using var client = new TcpClient();

                // Set a timeout for the connection attempt
                var connectTask = client.ConnectAsync(mailServer, 25);
                if (await Task.WhenAny(connectTask, Task.Delay(10000)) != connectTask)
                {
                    return false; // Connection timeout
                }

                using var stream = client.GetStream();
                using var reader = new StreamReader(stream);
                using var writer = new StreamWriter(stream) { AutoFlush = true };

                // Wait for the initial greeting
                string response = await ReadResponseWithTimeoutAsync(reader);
                if (string.IsNullOrEmpty(response) || !response.StartsWith("220"))
                    return false;

                // Send HELO command
                await writer.WriteLineAsync($"HELO example.com");
                response = await ReadResponseWithTimeoutAsync(reader);
                if (string.IsNullOrEmpty(response) || !response.StartsWith("250"))
                    return false;

                // Send MAIL FROM command
                await writer.WriteLineAsync($"MAIL FROM:<verify@example.com>");
                response = await ReadResponseWithTimeoutAsync(reader);
                if (string.IsNullOrEmpty(response) || !response.StartsWith("250"))
                    return false;

                // Send RCPT TO command to verify email existence
                await writer.WriteLineAsync($"RCPT TO:<{email}>");
                response = await ReadResponseWithTimeoutAsync(reader);

                // Send QUIT command to close connection properly
                await writer.WriteLineAsync("QUIT");

                // If the response starts with 250, the email exists
                return !string.IsNullOrEmpty(response) && response.StartsWith("250");
            }
            catch
            {
                // If any error occurs during the verification process
                return false;
            }
        }

        private async Task<string> ReadResponseWithTimeoutAsync(StreamReader reader)
        {
            // Create a task to read a line with a timeout
            var readTask = reader.ReadLineAsync();
            if (await Task.WhenAny(readTask, Task.Delay(5000)) == readTask)
            {
                return await readTask;
            }

            // Timeout occurred
            return null;
        }
}
}
 