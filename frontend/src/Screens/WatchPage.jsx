import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FaCloud } from 'react-icons/fa'
import MyPlyrVideo from './MyPlyrVideo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import AuthContext from '../context/AuthContext'
import { Button } from '@headlessui/react'
import { FaShareAlt, FaEdit } from 'react-icons/fa'
import ShareMovieModal from '../Components/Modals/ShareMovieModal'
import { toast } from 'sonner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MovieContext } from '../context/MovieContext'
import SGFaHeart from '../Components/SGFaHeart'
import SgSlider from '../Components/Home/SgSlider'
import Skeleton from 'react-loading-skeleton'
import EditMovie from './Dashboard/Admin/EditMovie'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import TrailerModal from './TrailerModal'
const WatchPage = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [play, setPlay] = useState(false)

    const { user } = useContext(AuthContext)
    const [isModalOpen, setisModalOpen] = useState(false)


    const { movies, isLoading } = useContext(MovieContext)


    let [isOpen, setIsOpen] = useState(false)


    const open = useCallback(function open() {
        setIsOpen(true)
    })


    const close = useCallback(
        function close() {
            setIsOpen(false)
        }
    )

    useEffect(() => {
        setMovie(movies?.find((movie) => movie.title == id))

    }, [isLoading])



    const setModal = useCallback((data) => {
        setisModalOpen(data)
    })

    const RelatesMovies = movies?.filter((m) => {
        // Ensure we're not comparing the current movie with itself (m.id !== movie.id)
        return m.id !== movie?.id && m.genre.some(genre => movie?.genre.includes(genre));
    });



    let title = `${movie?.title} (${movie?.year})`

    document.title = movie ? title : 'SG Uplaods | Watch'

    return (
        <Layout>


            <>
                <div className="container mx-auto bg-dry px-4 py-2 mb-2">
                    <EditMovie close={close} isOpen={isOpen} movie={movie}></EditMovie>

                    {
                        movie && <ShareMovieModal movie={movie} isModalOpen={isModalOpen} setisModalOpen={setModal}></ShareMovieModal>
                    }



                    <div className="flex-btn flex-row mb-2 gap-4bg-main rounded border border-gray-800 py-4 px-2 lg:hidden">
                        <Link to={window.location.pathname.replace("watch", "movie")} className='md:text-lg text-sm  flex gap-3 items-center font-bold text-dryGray'>
                            {
                                movie ?
                                    <><BiArrowBack></BiArrowBack> <p className=''>{`${movie?.title} (${movie.year})`}</p></>
                                    : <Skeleton baseColor="rgb(22 28 63)" className='animate-pulse' containerClassName="animate-pulse"></Skeleton>
                            }

                        </Link>



                    </div>


                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-4 lg:col-span-3">
                            {
                                movie ?
                                    <MyPlyrVideo play={play} movie={movie}></MyPlyrVideo>
                                    : <Skeleton baseColor="rgb(22 28 63)" containerClassName="animate-pulse" className='animate-pulse' height={300}></Skeleton>
                            }
                            <div className="grid grid-cols-4 place-content-center justify-between gap-2 my-4">

                                <div className="col-span-2 p-2 flex gap-2">
                                    {
                                        movie?.genre.slice(0, 2).map((item, idx) => (
                                            <Button key={idx} className=" p-1 bg-white/10 hover:bg-white/10 active:bg-white/10 smoothie bubbly rounded text-sm lg:text-lg"> {item}</Button>
                                        ))
                                    }

                                </div>
                                <div className="col-span-2 flex justify-end items-center gap-2">
                                    <TrailerModal movie={movie}></TrailerModal>

                                    <Button onClick={() => setisModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"><FaShareAlt /></Button>


                                    {
                                        user ? <Link to={movie?.stream.replace("video", "dl")} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                            <FaCloud></FaCloud>
                                        </Link> : <Button onClick={() => toast("Only logged in users can download", { closeButton: true })} className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm">
                                            <FaCloud></FaCloud>
                                        </Button>
                                    }
                                    {
                                        user?.is_superuser && (
                                            <Button onClick={() => {
                                                setMovie(movie)
                                                open()
                                            }} className='bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-3 font-medium py-3 text-sm'>
                                                <FaEdit className='text-green-500'></FaEdit>
                                            </Button>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="col-span-4 lg:col-span-1">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="lg:col-span-2 flex flex-col items-center justify-center w-full gap-3">

                                    <div className="border border-border p-1 transitions relative rounded overflow-hidden lg:col-span-2 h-fit">

                                        {
                                            movie ?
                                                <LazyLoadImage effect="blur" wrapperProps={{
                                                    style: { transitionDelay: "0.6s" },
                                                }} src={movie.poster} alt={movie.title} title={movie.title} className="object-cover lg:h-64 mx-auto" />
                                                : <Skeleton baseColor="rgb(22 28 63)" height={250} containerClassName="animate-pulse"></Skeleton>
                                        }

                                        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                                            <h6 className="font-semibold truncate">{movie?.title}</h6>
                                        </div>
                                    </div>
                                </div>


                                <div className="lg:col-span-2 flex flex-col gap-4 flex-grow pl-4 py-3 text-white shrink-0 text-sm 2xl:text-base !tracking-wider w-full">
                                    {
                                        movie ?
                                            <>

                                                <div className="flex gap-1 flex-col tracking-wider">
                                                    <Disclosure >
                                                        <DisclosureButton className="group w-full items-center justify-between hidden lg:flex">
                                                            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                                                                Plot
                                                            </span>
                                                            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                                                        </DisclosureButton>

                                                        <DisclosurePanel className="bg-white/10 hover:bg-white/10 p-2">
                                                            {movie?.plot}
                                                        </DisclosurePanel>
                                                    </Disclosure>

                                                </div>
                                                <div className="flex gap-2 flex-col tracking-wider font-light">
                                                    <Disclosure >
                                                        <DisclosureButton className="group w-full flex items-center justify-between">
                                                            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                                                                Cast
                                                            </span>
                                                            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                                                        </DisclosureButton>

                                                        <DisclosurePanel className=" p-2">
                                                            {movie?.actors.join(", ")}                                                            </DisclosurePanel>
                                                    </Disclosure>
                                                </div>
                                                <div className="flex gap-2 flex-col tracking-wider font-light">
                                                    <span className="font-medium text-gray-200 !shrink-0 tracking-wider">Language(s)</span>
                                                    <button className=" smoothie bubbly rounded flex-grow-0 size-fit">{movie?.spokenLanguages.slice(0, 2).map((l) => l.language).join(", ")}</button>
                                                </div>
                                                <div className="flex flex-col gap-1 tracking-wider font-light">
                                                    <span className="font-medium text-gray-200 !shrink-0 tracking-wider">Aired</span>
                                                    <span>{`${movie?.releaseDetailed.day}/${movie?.releaseDetailed.month}/${movie?.releaseDetailed.year}`}</span>
                                                </div>
                                            </>
                                            : <Skeleton baseColor="rgb(22 28 63)" height={200} containerClassName="animate-pulse"></Skeleton>
                                    }


                                </div>

                            </div>
                            <div className="lg:hidden ">
                                <h6 className="font-semibold bg-dry truncate py-2 mt-2">{movie?.title}</h6>

                                <Disclosure >
                                    {({ open }) => (
                                        <div className='bg-white/10 hover:bg-white/10'>
                                            <DisclosureButton className={`groupl items-center justify-between text-sm/6 w-full text-white ${open ? 'cursor-default' : 'truncate'} `}>
                                                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80 flex p-2">

                                                    {movie?.plot}
                                                </span>
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

                    </div>






                </div>
                {/* <MovieCasts movie={movie} /> */}

                <div className="container mx-auto min-h-screen px-2 my-6">

                    <MovieRates movie={movie} play={play}></MovieRates>
                    <div className="my-14">
                        <SgSlider movies={RelatesMovies} title="Related Movies" Icon={BsCollectionFill}></SgSlider>

                        {/* </div> */}
                    </div>
                </div>
            </>




        </Layout>




    )
}

export default WatchPage
