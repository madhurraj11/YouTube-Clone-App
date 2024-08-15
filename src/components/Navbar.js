import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube, BsBell } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { changeSearchTerm, clearVideos } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    const handleSearch = () => {
        if(location.pathname !== '/search') navigate("/search");
        else{
            dispatch(clearVideos);
            dispatch(getSearchPageVideos(false));
        }
    }

  return (
    <div className='flex justify-between px-14 h-14 items-center bg-[#212121] opacity-95 sticky'>
        <div className='flex gap-8 items-center text-2xl'>
            <div>
                <GiHamburgerMenu />
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <BsYoutube className='text-3xl text-red-600' />
                <span className='text-2xl'>Youtube</span>
            </div>
        </div>    
            <div className='flex items-center justify-center gap-5'>
                <form onSubmit={(e)=> {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl'>
                        <div className='flex gap-5 items-center pr-5'>
                            <input type="text" placeholder="Search" className='w-96 bg-zinc-900 focus:outline-none border-none' 
                            value={searchTerm}
                            onChange={(e) => dispatch(changeSearchTerm(e.target.value))}/>
                        </div>
                        <button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl'>
                        <AiOutlineSearch className='text-xl'/>
                        </button>
                    </div>
                </form>    
                <div className='text-xl p-3 bg-zinc-900 rounded-full'>
                    <FaMicrophone/>
                </div>
                </div>
                <div className='flex gap-8 items-center text-xl'>
                    <RiVideoAddLine />
                    <div className='relative'>
                    <BsBell />
                    <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1'>9+ </span>
                    </div>
                    <img src="data:image/png;base64,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" 
                    alt="profile logo" className='w-9 h-9 rounded-full'/>
                </div>
            </div>
  )
}

export default Navbar;