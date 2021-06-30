using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace TinyPianist.Ui.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptions<FrontEndConfig> _frontEndConfig;

        public HomeController(IOptions<FrontEndConfig> frontEndConfig)
        {
            _frontEndConfig = frontEndConfig;
        }

        [Route("{*url}")]
        public IActionResult Index(string url)
        {
            return File("~/index.html", "text/html");
        }

        [Route("_internal/config")]
        public IActionResult Config()
        {
            return Ok(_frontEndConfig.Value);
        }

    }
}