import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiArrowBack } from 'react-icons/bi'


const MovieInfo = ({ movie }) => {

    return movie && (
        <div className="col-span-4 lg:col-span-1">
        <div className="grid grid-cols-2 gap-3">
            <div className="lg:col-span-2 flex flex-col items-center justify-center w-full gap-3">

                <div className="border border-border p-1 transitions relative rounded overflow-hidden lg:col-span-2 h-fit">

                    {
                        movie ?
                            <LazyLoadImage effect="blur" wrapperProps={{
                                style: { transitionDelay: "0.6s" },
                            }} src={movie.poster} alt={movie.title} title={movie.title} className="object-cover lg:h-64 mx-auto" />
                            : <Skeleton baseColor="rgb(22 28 63)" height={220} width={150} containerClassName="animate-pulse"></Skeleton>
                    }

                    {
                        movie ? <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                            <h6 className="font-semibold truncate">{movie?.title}</h6>
                        </div>
                            : <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>
                    }

                </div>
            </div>


            <div className="lg:col-span-2 flex flex-col gap-4 flex-grow pl-4 py-3 text-white shrink-0 text-sm 2xl:text-base !tracking-wider w-full">


                <div className="hidden lg:flex gap-1 flex-col tracking-wider">
                    <Disclosure defaultOpen={true}>
                        <DisclosureButton className="group w-full items-center justify-between hidden lg:flex">
                            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                                Plot
                            </span>
                            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                        </DisclosureButton>

                        <DisclosurePanel className="bg-white/10 hover:bg-white/10 p-2">
                            {
                                movie ? <p>{movie?.plot}</p>
                                    : <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>
                            }

                        </DisclosurePanel>
                    </Disclosure>

                </div>
                <div className="flex gap-2 flex-col tracking-wider font-light">
                    <Disclosure defaultOpen={true}>
                        <DisclosureButton className="group w-full flex items-center justify-between">
                            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                                Cast
                            </span>
                            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                        </DisclosureButton>

                        <DisclosurePanel>
                            {
                                movie ? <p>{movie.actors.join(", ")}  </p>
                                    : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse"></Skeleton>
                            }
                        </DisclosurePanel>
                    </Disclosure>
                </div>
                <div className="flex gap-2 flex-col tracking-wider font-light">
                    <span className="font-medium text-gray-200 !shrink-0 tracking-wider">Language(s)</span>

                    {
                        movie ? <span>
                            {movie?.spokenLanguages.map((l) => l.language).join(", ")}</span>
                            : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse"></Skeleton>
                    }

                </div>
                <div className="flex flex-col gap-1 tracking-wider font-light">
                    <span className="font-medium text-gray-200 !shrink-0 tracking-wider">Aired</span>
                    {
                        movie ? <span>{`${movie?.releaseDetailed.day}/${movie?.releaseDetailed.month}/${movie?.releaseDetailed.year}`}</span>

                            : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse"></Skeleton>
                    }
                </div>





            </div>

        </div>
        <div className="lg:hidden ">
            <h6 className="font-semibold bg-dry truncate py-2 mt-2 text-center">{movie?.title}</h6>

            <Disclosure>
                {({ open }) => (
                    <div className='bg-white/10 hover:bg-white/10'>
                        <DisclosureButton className={`groupl items-center justify-between text-sm/6 w-full text-white ${open ? 'cursor-default' : 'truncate'} `}>
                            {
                                movie ? <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80 flex p-2">

                                    {movie?.plot}
                                </span>
                                    : <Skeleton baseColor="rgb(22 28 63)" height={30} containerClassName="animate-pulse"></Skeleton>
                            }

                            {
                                !open && <div className="flex flex-col items-center w-full">
                                    <ChevronDownIcon className={`size-5 fill-white/60 group-data-[hover]:fill-white/50 {${open ? 'rotate-180' : ''}}`} />
                                </div>
                            }




                        </DisclosureButton>


                    </div>
                )}

            </Disclosure>
        </div>




    </div>
    )
}

export default MovieInfo
