export default function NotFound() {
  return (
    <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
        <div className="p-6 sm:p-8 lg:p-16 space-y-8 text-center">
          <h4 className="text-base text-center text-gray-600  ">404</h4>
          <div>
            <h1 className="text-2xl">Page Not Found</h1>
          </div>

          <div className="text-gray-600 cursor-pointer">Go back home</div>
        </div>
      </div>
    </div>
  );
}
