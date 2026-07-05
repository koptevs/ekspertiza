import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    allowedDevOrigins: ['192.168.31.70', 'localhost'],
};

export default nextConfig;
