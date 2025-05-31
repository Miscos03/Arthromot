export interface MQTTConfig {
  host: string;
  port: number;
  clientId: string;
  useSSL: boolean;
  topics: {
    controlTopic: string;
    listenTopic: string;
  };
}
