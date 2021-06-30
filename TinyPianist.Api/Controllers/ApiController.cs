using System;
using Microsoft.AspNetCore.Mvc;

namespace TinyPianist.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiController : ControllerBase
    {
        [Route("date")]
        public IActionResult GetCurrentDateTime()
        {
            return Ok(new { Date = DateTime.UtcNow });
        }
    }
}