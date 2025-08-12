// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // images: {
//   //    domains: ["www.cms.org"],
//   // },
//   basePath: '/pinkspot',
//   output: "standalone", // Helps with deployment and build issues
//   webpack: (config) => {
//     config.cache = false; // Disable caching to prevent chunk errors
//     return config;
//   },
// };


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "206.189.130.102",
//         port: "4000",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn0.gstatic.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "png.pngtree.com",
//         pathname: "/**",
//       },
//     ],
//   },
//   output: "standalone",
//   trailingSlash: true,
//   webpack: (config) => {
//     config.cache = false;
//     return config;
//   },
// };

// export default nextConfig;





// const nextConfig = {
//     images: {
//       domains: ["www.cms.org"],
//     },
//     async headers() {
//       return [
//         {
//           source: "/api/:path*",
//           headers: [
//             { key: "Access-Control-Allow-Origin", value: "*" },
//             {
//               key: "Access-Control-Allow-Methods",
//               value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//             },
//             { key: "Access-Control-Allow-Headers", value: "Content-Type" },
//           ],
//         },
//       ];
//     },
//   };



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "206.189.130.102",
//         port: "4000",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn0.gstatic.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "png.pngtree.com",
//         pathname: "/**",
//       },
//     ],
//   },
//   output: "standalone",
//   trailingSlash: true,
//   webpack: (config) => {
//     config.cache = false;
//     return config;
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "206.189.130.102",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "pinkspot.cc",
        pathname: "/api/v1/uploads/**", // Match your actual URL pattern
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  trailingSlash: true,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
