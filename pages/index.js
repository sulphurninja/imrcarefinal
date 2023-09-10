import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { ReactComponent as CompanyIcon } from '../public/images/logo.png';
import 'react-whatsapp-widget/dist/index.css';
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { WhatsAppWidget } from 'react-whatsapp-widget';
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import Order from "@layouts/components/Order";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0 ">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1]  w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
                <Link href='/Accessories'>
                  <p className="animate-pulse text-blue-400 p-3 cursor-pointer text-xl font-bold">🎉 Hot Offers: Accessories</p>
                </Link>
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src='/images/magic.gif'
                  width={548}
                  height={443}
                  priority={true}
                  alt="Mobile Repair Animated Image"
                />

              </div>
            )}
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 bg-white rounded-2xl lg:col-8">
              <div className="grid md:grid-cols-3 grid-cols-2 ">
                <img src='/images/hero2.gif' />
                <div className=' text-black'>
                  <div className='  mx-4 py-12 flex flex-row  text-sm md:text-3xl lg:text-3xl tracking-tight font-semibold'>
                    <div className='leading-[1.15]'>
                      <div >
                        we're experts in samsung, <span className='text-red-500'>apple</span>,  <span className='text-amber-500'>xiaomi</span>, asus, <span className='text-blue-200'>oneplus</span>, etc every brand and every model's mobile <span className='text-yellow-400'>phone repair.</span><br />


                      </div>
                    </div>
                  </div>
                </div>
                <img src='/images/hero.gif' />
                <img src='/images/ser.gif' className="md:hidden" />
              </div>


              <div className="section block bg-[#F7F7F7] dark:bg-white -theme-dark -300">
                <h1 className='text-black dark:text-black -950 md:text-3xl text-center'>Why IMR Care?</h1>

                <div id='about' className='text-white dark:text-black bg-[#F7F7F7] dark:bg-white text-lg p-2 xl:p-7 py-20  text-center'>
                  <h1 className='text-cyan-700 text-lg mb-10'>Solution for every problem</h1>
                  <div className='text-black grid grid-cols-3 gap-1 md:gap-10 mb-24 font-bold'>
                    <div className='grid justify-items-center text-md md:text-lg gap-3 mt-3' >

                      <img src='whyIMRC/calendar.png' className='h-8 md:h-20 ' />
                      <p className='text-sm md:text-lg'>1 Day Service</p>
                      <p className='text-sm text-slate-700 font-normal'>We repair  in just 1 day!</p></div>
                    <div className='grid justify-items-center text-sm md:text-lg gap-3 mt-3'>

                      <img src='whyIMRC/All-Brands-&-Models.png' className='h-8 md:h-20 ' />
                      <p className='text-sm md:text-lg'>All Brands & Models</p>
                      <p className='md:text-sm text-slate-700 font-normal'>We repair all models!</p></div>

                    <div className='grid justify-items-center text-md md:text-lg gap-3 mt-3'>

                      <img src='whyIMRC/mechanic.png' className='h-8 md:h-20 ' />
                      <p className='text-sm md:text-lg'>Expert Technicians</p>

                      <p className='text-sm text-slate-700 font-normal'>Certified professionals </p>
                    </div>
                    <div className='grid justify-items-center text-md md:text-lg gap-3 mt-3'>
                      <img src='whyIMRC/calendar-3.png' className='h-8 md:h-20 ' />
                      <p className='text-sm md:text-lg'>90 Days Warranty</p>
                      <p className='text-sm text-slate-700 font-normal'>Genuine products with a warranty of 3 months!</p>
                    </div>

                    <div className='grid justify-items-center text-md md:text-lg gap-3 mt-3'>
                      <img src='whyIMRC/phone_parts.png' className='h-8 md:h-20 ' />
                      <p className='text-sm md:text-lg'>Genuine Parts</p>
                      <p className='text-sm text-slate-700 font-normal'>We provide quality & genuine products only!</p>
                    </div>
                    <div className='grid justify-items-center text-md md:text-lg gap-3 mt-3'>
                      <img src='whyIMRC/secure_data.png' className='h-8 md:h-20 ' />
                      <p className=''>Data Security</p>
                      <p className='text-sm text-slate-700 font-normal'>Don't worry, your data is safe with us!</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className='text-cyan-950 md:text-3xl' >We Repair</p>
                    <p className='text-cyan-700 text-lg mb-10'>We Repair Almost Every Issue in Your Phone</p>
                    <div className='grid grid-cols-3 md:grid-cols-4 justify-items-center text-black gap-3 md:gap-10 font-bold mb-20'>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/broken.png' className='h-12 md:h-20' />Display Replacement</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/mobile-phone.png' className='h-12 md:h-20' />Display Glass Replacement</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/computer.png' className='h-12 md:h-20' />Software Issue</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/signal.png' className='h-12 md:h-20' />Network Issue</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/electricity.png' className='h-12 md:h-20' />Charging, battery replacement</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/dual-camera.png' className='h-12 md:h-20' />Mobile Camera Replacement</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/smartphone.png' className='h-12 md:h-20' />Water Damage Phone</div>
                      <div className='grid justify-items-center gap-1 md:gap-3 text-sm md:text-lg'><img src='whyIMRC/speaker.png' className='h-12 md:h-20' />Speaker , Mic Problem</div>
                    </div>
                  </div>
                </div>
              </div>

          

            </div>

            {/* sidebar */}
            <Sidebar
              className={""}
              posts={posts}
              categories={categories}
            />
            <WhatsAppWidget CompanyIcon={CompanyIcon} phoneNumber="919011819143" />
            <Order />
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
