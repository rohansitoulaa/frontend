type CrumbProps = {
    crumbsValue?: string[];
    currentCrumb?: number;
};

const AuthorBread = ({ crumbsValue = [], currentCrumb = 0 }: CrumbProps) => {
    return (
        <div className="flex flex-wrap gap-2 sm:gap-5 justify-center items-center">
            {crumbsValue.map((_, index) => {
                const isActive = index + 1 === currentCrumb;
                const isCompleted = index + 1 < currentCrumb;

                return (
                    <div key={index} className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center gap-2 sm:gap-3">
                            <div
                                className={`flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-full  transition-all 
                                    ${isActive ? "bg-green-700 text-white border-none cursor-pointer" : ""}
                                    ${isCompleted ? "bg-black text-white cursor-pointer" : " text-black border-1 border-black cursor-not-allowed"}`}
                            >
                                {index + 1}
                            </div>
                            {index < crumbsValue.length - 1 && (
                                <hr className="w-8 sm:w-12 border-[1.5px]" />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AuthorBread;