using Examine;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using Umbraco.Cms.Infrastructure.Examine;

public class ExamineRebuildHostedService : BackgroundService
{
    private readonly IExamineManager _examineManager;
    private readonly IIndexRebuilder _indexRebuilder;
    private readonly ILogger<ExamineRebuildHostedService> _logger;

    public ExamineRebuildHostedService(
        IExamineManager examineManager, IIndexRebuilder indexRebuilder,
        ILogger<ExamineRebuildHostedService> logger)
    {
        _indexRebuilder = indexRebuilder;
        _examineManager = examineManager;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {

                foreach (var index in _examineManager.Indexes)
                {
                    _indexRebuilder.RebuildIndex(index.Name);
                }
                _logger.LogInformation("Examine indexes rebuilt at {time}", DateTimeOffset.Now);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error rebuilding Examine indexes");
            }

            // Wait 12 hours
            await Task.Delay(TimeSpan.FromHours(12), stoppingToken);
        }
    }
}