/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //    domains: ["www.cms.org"],
    // },
   basePath: '/pinkspot'
 };
 
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
   export default nextConfig;
