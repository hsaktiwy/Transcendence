import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

function SkeletonDashboard() {
  return (
    <>
    <div className="animate-pulse">
      <div className="lg:mb-0 pb-20 font-poppins 2xl:my-[20px] p-3 lg:ml-[70px] dashboard-container md:h-[1700px] xl:h-[1200px] 2xl:h-[1150px] text-white w-[90%] lg:w-[calc(100%-160px)] my-[20px] 2xl:p-10 2xl:pt-0 lg:mx-[50px] absolute top-[80px] left-[50%] -translate-x-[50%] lg:-translate-x-0 lg:left-[80px] grid md:grid-cols-12 md:grid-rows-12 xl:grid-cols-12 xl:grid-rows-12 2xl:grid-cols-12 2xl:grid-rows-12 gap-4">
        {/* Profile Card Skeleton */}
        <div className="rounded-2xl row-span-1 justify-center items-center md:col-span-12 md:row-span-3 xl:row-span-5 2xl:col-span-12 xxl:row-span-6 xxl:col-span-9 grid grid-cols-12">
          <div className="h-full col-span-12 sm:col-span-3 bg-gradient-to-br from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] rounded-xl 2xl:col-span-2 flex flex-col justify-center items-center">
            <div className="pt-4 h-full col-span-2 flex flex-col justify-center items-center rounded-2xl">
              <Skeleton circle={true} height={100} width={100} />
              <div className="mt-5 flex flex-col justify-center items-center space-y-2">
                <Skeleton width={96} height={24} />
                <Skeleton width={64} height={16} />
              </div>
              <Skeleton width={120} height={32} className="mt-4 rounded-lg" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="h-full mt-4 sm:mt-0 col-span-12  sm:col-span-9 sm:pl-4 2xl:col-span-10">
            <div className="flex items-center justify-center p-4 w-full  sm:h-full xxl:p-10 bg-gradient-to-br from-[#283137] to-[#242729] shadow-3xl shadow-[#22333869] rounded-2xl">
              <div className="w-full h-full grid gap-4 grid-rows-2">
                <div className="relative bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] shadow-md px-5 lg:px-10 rounded-3xl grid grid-rows-1">
                  <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
                  <div className="h-20 hidden sm:flex items-center xxl:items-end">
                    <Skeleton width={144} height={32} className="rounded-xl" />
                  </div>
                  <div className="flex flex-col justify-center items-center mb-4 ">
                    <Skeleton width={96} height={24} />
                  </div>
                    <Skeleton width="100%" height={12} className="rounded-full mb-5" />
                </div>
                <ScrollArea className="w-full verflow-x-scroll   whitespace-nowrap rounded-md">
                        <div className="flex  gap-4 justify-center">
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />
                        <Skeleton   className="rounded-xl bg-gradient-to-br from-[#242b2f] to-[#1b1e1f]  shadow-md p-3  mt-6 h-32 w-32  xxl:h-48 xxl:w-48 " />

                            </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      <div className="md:hidden xxl:block xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6">
      <div className="rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] h-full p-4">
        <div className="flex flex-col space-y-4 h-full">
          <Skeleton width="60%" height={24} className="mb-4" />
          <div className="row-span-2  px-6 flex items-center justify-between w-full">
      <div className="flex items-center justify-center p-4  flex-col gap-3">
        <Skeleton circle={true} height={100} width={100} />
        <Skeleton width={80} height={20} />
      </div>
      
      <div>
        <Skeleton width={60} height={30} />
      </div>

      <div className="flex items-center justify-center flex-col gap-3">
        <Skeleton circle={true} height={100} width={100} />
        <Skeleton width={80} height={20} />
      </div>
    </div>
          {/* Skeleton for Match Items */}
          <div className="pt-2 row-span-4">
      <h1 className="text-base text-gray-400 font-medium"></h1>
      <div className="w-full border-t border-[#5E97A9] rounded-full my-3 mt-1"></div>
      <div className="h-40 xxl:h-60 overflow-y-auto px-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full mb-4 flex items-center bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] gap-4 shadow-lg rounded-lg py-4"
          >
            <div className="bg-gradient-to-b from-[#84D679] via-[#598752] to-[#2D392C] w-1 h-16 rounded-r-lg"></div>
            <div className="w-full mr-4">
              <div className="flex items-center">
                <div className="min-w-32 w-[100%] h-full flex items-center">
                  <Skeleton circle={true} height={44} width={44} />
                  <div className="mx-3">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={70} height={12} />
                  </div>
                </div>
                <div>
                  <Skeleton width={24} height={24} />
                </div>
              </div>
              <div className="w-full border-t border-[#5E97A9] rounded-full my-4"></div>
              <div className="flex items-center">
                <div className="min-w-32 w-[100%] h-full flex items-center">
                  <Skeleton circle={true} height={44} width={44} />
                  <div className="mx-3">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={70} height={12} />
                  </div>
                </div>
                <div>
                  <Skeleton width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
      </div>
      <div className="p-4 rounded-2xl xxl:px-7 md:hidden xl:block row-span-4 md:col-span-6 md:row-span-4 xl:col-span-4 xl:row-span-4 2xl:col-span-3 xxl:row-span-6 xl:p-3 xxl:p-10 flex justify-center items-center bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869]">
      <div  className="h-full w-full  flex flex-col gap-3 bg-gradient-to-bl from-[#242b2f] to-[#1b1e1f] rounded-xl justify-center items-center">
            <Skeleton circle={true} height={200} width={200} className="rounded-xl w- w-min-[100px] lg:w-[150px] lg:h-[150px]" />
            <Skeleton width={100} height={16} />
            <Skeleton width={150} height={20} />
      </div>
    </div>
    <div className="row-span-4 md:col-span-12 md:row-span-3 rounded-2xl p-4 bg-gradient-to-tr from-[#2f3a41] to-[#2B2F32] shadow-3xl shadow-[#22333869] xl:col-span-8 xl:row-span-4 2xl:col-span-9 xxl:row-span-6 xxl:col-span-6">
      <div className="w-full h-full bg-gradient-to-br from-[#242b2f] to-[#1b1e1f] flex flex-col justify-center items-center pb-7 pt-4 px-4 rounded-2xl">
        <Skeleton height={200} width="100%" />
      </div>
    </div>
    </div>
    </div>
    </>
);
}

export default SkeletonDashboard