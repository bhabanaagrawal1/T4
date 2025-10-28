import { Swiper,SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import { FreeMode,Pagination,Navigation } from 'swiper/modules' 
import { CardData, OpenBlog, ServiceData } from '../constants'
import mus_fest from '../assets/mus_fest.mp4'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {blogs} from '../../db.json'
import Blog_list from './BlogDetail'


const Home = () => {
  const sum = blogs.length + OpenBlog.length + 4
  const navigate = useNavigate()
  const [data,setData] = useState([])
  useEffect(()=>{
    loadBlogsData()
  },[])
  const loadBlogsData = async () =>{
    const response = await axios.get("http://localhost:5000/blogs")
    if(response.status === 200){
      setData(response.data)
    }else{
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure that you wanted to delete that blog ?")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`)
    if(response.status === 200){
      toast.success("Blog deleted successfully")
      loadBlogsData()
    }else{
      toast.error("Something went wrong");
    }
    }
  }
  return (
 <div>
      <Navbar/>
      <div className="md:bg-[linear-gradient(rgba(10,25,47,0.5),rgba(0,0,70,0.5)),url('https://i.pinimg.com/736x/32/5c/a5/325ca5ecb05616ff4ae398f3fcd1de5e.jpg')] bg-[linear-gradient(rgba(10,25,47,0.3),rgba(0,0,70,0.5)),url('https://i.pinimg.com/1200x/83/4f/a3/834fa312e31595f0224b4f5a122c4fd5.jpg')] w-full md:h-[160vh] h-[100vh] bg-no-repeat bg-cover z-0  bg-center bg-gradient-to-b from-transparent to-black/80">
        <div className='md:pt-65 md:translate-y-[0%] translate-y-[49%] text-center  text-white'>
          <span className='text-[20px] bg-white/20 backdrop-blur-md px-4 py-2 rounded-full'><i className="ri-shining-fill"></i> Relive the Magic</span>
          <h1 className='md:text-[3.1rem] md:m-5 md:mb-0 text-[1.5rem] mt-3 ml-5 mr-5 font-extrabold '>Because Some Magic Never Fades</h1>
          <p className='md:text-[1rem] text-sm text-shadow-indigo-200 md:ml-56 ml-7 mr-7 md:mr-56 mt-3 font-semibold md:mb-60'>Step into a world of wonder, where every story sparkles and every moment feels like magic.
Discover the heart of Disneyland — the happiest place on Earth.</p>

          <div className='w-[100%] h-90'>
            <div className='bg-transparent backdrop-blur-md h-[100%] w-[93%] md:translate-x-[7.5%] md:-translate-y-[12%] hidden md:block'>
              <div className='flex justify-center items-center w-[100%] h-[100%]'>
                <div className="w-[89%] text-left p-auto pl-6 pr-6">
                <h1 className='text-5xl font-semibold mb-5'>Ride the Unexpected</h1>
                <p className='mb-5'>Experience the wonder of Disneyland — where imagination, laughter, and dreams unite to create the happiest stories on Earth.</p>
                <p>Join the dreamers and adventurers. Explore enchanting tales, park secrets, guides, and magical moments that make every visit unforgettable.</p>
              </div>
              <Swiper
                style={{'--swiper-pagination-color':'#601EF9','--swiper-pagination-bullet-inactive-color':'#d1d5db','--swiper-pagination-bullet-inactive-opacity':'0.5'}}
                breakpoints={{
                  400:{
                    slidesPerView:2,
                    spaceBetween:10
                  },
                  768:{
                    slidesPerView:3,
                    spaceBetween:10
                  }
                }}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules = {[FreeMode,Pagination]}
              >
                {ServiceData.map((item)=>(
                  <SwiperSlide key={item.title}>
                    <div className='flex flex-col group relative shadow-lg text-white rounded-xl py-8 h-[250px] w-[215px] lg:h-[300px] lg:w-[250px]'>
                      <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage:`url(${item.backgroundImage})`}}/>
                      <div className='absolute inset-0 bg-black opacity-30 font-serif group-hover:opacity-65'></div>
                      <div className='relative flex flex-col gap-1 justify-items-start'>
                        <h1 className='text-[14px] lg:text-xl pl-3 pt-0 text-left'>{item.title}</h1>
                        <p className='lg:text-[12px]  pl-3 pr-3 text-left'>{item.content}</p>
                      </div>
                    </div>
                  </SwiperSlide>               
                ))}
              </Swiper>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="w-full md:h-[90vh] h-[100vh] py-12 flex justify-center items-center md:mt-0 mt-5">
  <section id='reach' className="w-[95%] flex flex-col items-center">
    <h2 className="md:text-5xl text-4xl italic text-black p-9 text-center">
      The Spirit of Endless Wonder
    </h2>
    <Swiper
    style={{'--swiper-navigation-color':'#601EF9','--swiper-navigation-size':'25px','--swiper-navigation-sides-offset':'-5px',}}
      slidesPerView={4}
      spaceBetween={20}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="w-full"
      breakpoints={{
        350: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      
    >
      {CardData.map((item) => (
        <SwiperSlide key={item.id}>
          <div className='w-full h-[100%] flex justify-center items-center'>
            <div className="md:w-[270px] w-[300px] md:h-[60vh] h-[80vh] md:pb-0 pb-5" onClick={()=>navigate(`/Open_Blog/${item.id}`)}>
            <img
              className="w-full h-[70%] object-cover rounded-t-full hover:opacity-70"
              src={item.image}
              alt={item.title}
            />
            <div className="p-1">
              <p className="mt-1 font-semibold text-xs text-gray-500">
                {item.date} <span> &#183; {item.readTime}</span>
              </p>
              <h1 className="mt-1 font-semibold font-sans">
                {item.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500 font-semibold line-clamp-2">
                {item.subheading.slice(0, 70) + "..."}
              </p>
            </div>
          </div>
          </div>
        </SwiperSlide>
        
      ))}
    </Swiper>
  </section>
      </div>
      <div className='w-full md:h-[100vh] h-auto md:flex block md:justify-evenly md:items-center md:flex-row flex-col bg-gray-200'>
        <div className='md:w-[20%] md:h-[90%] w-[100%] items-center'>
          <h1 className='w-[100%] md:h-[15%] text-8xl mb-2 text-center'>HALLO</h1>
          <h1 className='w-[100%] h-[15%] text-8xl mb-5 text-center'>WEEN</h1>
          <img className='md:w-[100%] md:h-[65%] md:block hidden' src="https://i.pinimg.com/736x/e3/74/b3/e374b3678e82b7f65fbf7caeedaa1875.jpg" alt="" />
        </div>
        <div className='md:w-[24%] md:h-[100%] w-[100%] h-[50%] flex justify-center items-center'>
          <video src={mus_fest} className='h-[100%] md:w-[100%] w-[90%]' autoPlay loop muted ></video>
        </div>
        <div id='one' className='md:w-[45%] w-full h-[90%] block'>
          <div className='w-[100%] md:h-[70%] h-auto md:flex  md:justify-evenly  md:pt-5 md:pb-5 pt-0 pb-0'>
            <div className='md:w-[50%] w-[100%] md:p-0 p-5 text-left h-[100%] md:flex block flex-col md:justify-evenly'>
            <div className='w-[100%] md:h-[30%] md:flex block justify-center items-center cursor-pointer' onClick={()=>navigate("/post/1#one")}>
              <div className='w-[100%]  md:p-1 p-4'><span className='outline-1 p-1 font-semibold mt-3 text-gray-500'>HALLOWEEN</span><span className='pl-3 text-gray-500'>OCT 31, 2025</span>
              <h1 className='font-semibold text-sm mt-3'>Get Ready for a Spooktacular Disneyland Halloween — Where Ghouls, Ghosts, and Pumpkin Magic Await!</h1></div>
            </div>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <div className='w-[100%] h-[30%] flex justify-center items-center cursor-pointer' onClick={()=>navigate("/post/2#one")}>
              <div className='w-[100%] md:p-1 p-4'><span className='outline-1 p-1 font-semibold mt-3 text-gray-500'>HALLOWEEN</span><span className='pl-3 text-gray-500'>OCT 31, 2025</span>
              <h1 className='font-semibold text-sm mt-3'>Spooky Snacks and Sweet Surprises — Disneyland’s Halloween Treats You Can’t Miss!</h1></div>
            </div>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <div className='w-[100%] h-[30%] flex justify-center items-center cursor-pointer' onClick={()=>navigate("/post/3#one")}>
              <div className='w-[100%] md:p-1 p-4'><span className='outline-1 p-1 font-semibold mt-3 text-gray-500'>HALLOWEEN</span><span className='pl-3 text-gray-500'>OCT 31, 2025</span>
              <h1 className='font-semibold text-sm mt-3'>Inside the Ghosthouse — When Disneyland’s Haunted Halls Come Alive After Dark</h1></div>
            </div>
            <div className='w-full h-[1px] bg-gray-500'></div>
            </div>
            <div className='w-[40%] h-[100%]'>
              <img className='w-[100%] h-[100%] object-cover md:block hidden' src="https://i.pinimg.com/1200x/e0/88/9a/e0889a804a952f7b501d2319c6ccf170.jpg" alt="" />
            </div>
          </div>
          <div className='w-[100%] h-[30%]  flex justify-evenly items-center cursor-pointer' onClick={()=>navigate("/post/4#one")}>
            <div className='w-[90%] md:p-1 p-4 pt-0'><span className='outline-1 p-1 font-semibold mt-3 text-gray-500'>HALLOWEEN</span><span className='pl-3 text-gray-500'>OCT 31, 2025</span>
            <h1 className='font-bold text-xl mt-2'>When the Cartoons Came to Life — Disneyland’s Beautiful Parade of Characters!</h1>
            <h2 className='text-[14px] mt-3  text-gray-500'><i className="ri-shining-fill"></i> Written by <span className='font-bold text-black'>Choti’s Disney Journal</span> — A Dreamer at the Castle Gates</h2>
            </div>
          </div>
        </div>
      </div>
   <section id = 'two'>
    <div className='w-full h-auto flex justify-center items-center'>
  <div className='w-[95%] h-[80%] flex flex-col items-center'>
    <div className='md:text-5xl text-4xl text-black p-4 font-semibold mt-10 mb-7'>
      LATEST <span className='italic font-light'>From The</span> BLOG
    </div>
    <div className='w-full flex flex-wrap justify-center items-center md:col-span-4 sm-col-span-2 col-span-1 gap-10 mb-10'>
      {data && data.map((item, index) => (
        <div 
          key={index} 
          
          handleDelete = {handleDelete}
          className='md:w-[270px] w-[310px] h-[60vh] md:hover:scale-103 transition-transform duration-300 shadow-xl/30'
        >
          {/* Image */}
          <img 
            className='md:w-[270px] w-[310px] h-[35vh] object-cover' 
            src={item.image} 
            alt={item.title} 
          />                   
          <div className='md:w-[270px] w-[310px] h-[22vh] flex justify-center items-center'>
            <div className='w-[90%] h-[90%] flex flex-col justify-center text-left'>
              <div className='flex justify-between'>
                <p className='font-semibold text-sm text-gray-500 pt-4'>
                {item.date}<span> &#183; {item.readTime}</span>
              </p>
              <p onClick={()=>handleDelete(item.id)} className='pt-4'><i className="ri-delete-bin-line"></i></p>
              </div>
              <h1 className='font-semibold font-sans'>{item.title}</h1>
              <p className='mt-2 font-semibold text-sm text-gray-500'>
                {item.shortDesc.slice(0, 65) + "..."}
              </p>
              <div className='flex justify-center mt-1'>
                <span className=''><button className='border-2 pt-1 pb-1 pr-2 pl-2 bg-black text-white shadow-xl/20 border-black cursor-pointer rounded-sm' onClick={()=>navigate(`/Blog_list/${item.id}`)}>Read more</button></span>        
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
   </section>
      <div className='w-full md:h-[70vh] flex md:justify-evenly md:items-center flex-col md:flex-row h-auto'>
        <div className='md:w-[30%] md:h-[95%] flex md:flex-col sm:flex-row justify-between items-center'>
          <div className='md:w-[98%] md:h-[49%] rounded-xl w-[49.5%]'>
            <img className='rounded-xl object-cover md:w-[100%] md:h-[100%] h-[50vh] bg-top-right' src="https://i.pinimg.com/1200x/9d/67/7c/9d677cd8fe29d41c54bed65495fea3da.jpg
            " alt="" />
          </div>
          <div className='md:w-[98%] md:h-[49%] bg-black rounded-xl w-[49.5%] h-[50vh]'>
            <h1 className='bg-[url(https://i.pinimg.com/736x/45/41/df/4541df06f1a9734c0215e9109a6a50fb.jpg))] rounded-xl w-[100%] h-[100%] opacity-90 object-cover bg-bottom-3 md:text-4xl text-2xl flex justify-start items-end p-3'>Blogs Published<br/>{sum}</h1>
          </div>
        </div>
        <div  className='md:w-[69%] md:h-[95%] rounded-xl w-full h-[100%] mb-2 mt-1 md:mb-0 md:mt-0'>
          <h1 className='bg-[url(https://i.pinimg.com/1200x/64/6f/ca/646fca4b06b7aaa4cc5eb56322b8dac0.jpg)] rounded-xl w-[100%] h-[100%] z-0 flex justify-center items-center text-center md:font-semibold md:text-4xl text-2xl md:p-20 p-15 bg-center bg-no-repeat object-cover'>Beyond the rides, crafting memories that last a lifetime</h1>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
