using System;
using Confluent.Kafka;
using System.Text;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(" ---- CONSUMIDOR ----");

        var config = new ConsumerConfig
        {
            BootstrapServers = "localhost:9092",
            GroupId = "carro_group",
            AutoOffsetReset = AutoOffsetReset.Earliest
        };

        using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
        {
            consumer.Subscribe("carro_topic");

            while (true)
            {
                var consumeResult = consumer.Consume();
            }
        }
    }
}
