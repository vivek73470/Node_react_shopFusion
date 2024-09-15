import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import Pop1 from '../../Assets/pop 1.webp'
import Pop2 from '../../Assets/pop 2.webp'
import Pop3 from '../../Assets/pop 3.webp'
import Pop4 from '../../Assets/pop 4.webp'
import Pop5 from '../../Assets/pop 5.webp'
import Pop6 from '../../Assets/pop 6.webp'
import Pop7 from '../../Assets/pop 7.webp'
import Pop8 from '../../Assets/pop 8.webp'
import Pop9 from '../../Assets/pop 9.webp'
import Pop10 from '../../Assets/pop 10.webp'
function Popular() {
  return (
    <>
            <div className='popular-screen'>
                <div className='popular-wrapper'>
                    <div className='pop-catg'>
                        <h1>Popular Categories</h1>
                    </div>
                    <div className='pop-mens'>
                        <Link to=''>
                            <div className='pop-mens-wrap'>
                                <div className='pop-mens-multi'>
                                    <img src={Pop1} alt='' />
                                </div>
                                <div className='pop-mens-multi'>
                                    <img src={Pop2} alt='' />
                                </div>
                                <div className='pop-mens-multi'>
                                    <img src={Pop3} alt='' />
                                </div>
                                <div className='pop-mens-multi'>
                                    <img src={Pop4} alt='' />
                                </div>
                                <div className='pop-mens-multi'>
                                    <img src={Pop5} alt='' />
                                </div>
                                <div className='pop-mens-multi'>
                                    <img src={Pop6} alt='' />
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className='pop-womens'>
                        <Link to=''>
                            <div className='pop-women-wrap'>
                                <div className='pop-womens-multi'>
                                <img src="https://images.bewakoof.com/uploads/grid/app/category-box-new-boyfriend-tees-1668773241.jpg" alt="" />
                                </div>
                                <div className='pop-womens-multi'>
                                    <img src={Pop7} alt='' />
                                </div>
                                <div className='pop-womens-multi'>
                                    <img src={Pop8} alt='' />
                                </div>
                                <div className='pop-womens-multi'>
                                    <img src={Pop9} alt='' />
                                </div>
                                <div className='pop-womens-multi'>
                                    <img src={Pop10} alt='' />
                                </div>
                                <div className='pop-womens-multi'>
                                <img src="https://images.bewakoof.com/uploads/grid/app/category-box-new-fullsleevetees-1668773243.jpg" alt="" />
                                </div>
                            </div>
                        </Link>

                    </div>

                </div>

            </div>
        </>
  )
}

export default Popular