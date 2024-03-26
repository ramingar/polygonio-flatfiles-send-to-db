const insertDayAggsQuery = () => `
    INSERT INTO polygon_io.day_aggs 
    (
        ticker,
        volume,
        open,
        close,
        high,
        low,
        window_start,
        transactions
    )
    VALUES
    (
        :ticker,
        :volume,
        :open,
        :close,
        :high,
        :low,
        :window_start,
        :transactions
    );
`

export {insertDayAggsQuery}