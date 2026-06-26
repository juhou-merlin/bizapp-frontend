/**
 * Next.js 設定ファイル
 * S2IデプロイのためにStandaloneモードで出力する
 */
const nextConfig = {
  // S2Iデプロイ用: スタンドアロン出力モード
  output: 'standalone',

  // バックエンドAPIへのプロキシ設定
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL
          ? `${process.env.BACKEND_URL}/api/:path*`
          : 'http://bizapp-backend:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
