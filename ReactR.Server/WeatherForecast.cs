namespace ReactR.Server;

public class WeatherForecast
{
    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public ForecastSummary Summary => TemperatureF switch
    {
        < 30 => new("Freezing", "info"),
        < 50 => new("Chilly", "primary"),
        < 70 => new("Warm", "success"),
        < 90 => new("Hot", "warning"),
        _    => new("Scorching", "danger")
    };
}

public class ForecastSummary
{
    public ForecastSummary(string description, string theme)
    {
        Description = description;
        Theme = theme;
    }

    public string Description { get; }
    public string Theme { get; }
}