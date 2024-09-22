export type MemorySize = 256 | 512 | 1024 | 2048;
export type Region = 'us' | 'eu' | 'asia';
export type Environment = 'development' | 'production';
export type Levels = 'free' | 'pro' | 'enterprise';
export type Status = 'active' | 'inactive' | 'canceled';
export type Plan = {
    level: Levels;
    status: Status;
    price: number;
}
