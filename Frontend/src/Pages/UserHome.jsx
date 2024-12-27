import Uber_Logo_Black from '/Uber_Logo_Black.png'
const UserHome = () => {
    function fullSearchhandler() {

    }
    return (
        <div className='relative h-screen'>
            <img className="w-20 absolute left-5 top-5" src={Uber_Logo_Black} alt="" />
            <div className='h-screen w-screen z-1'>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' />
            </div>
            <div>
                <div className='  h-screen absolute top-0 w-full flex flex-col justify-end'>
                    <div className=' h-[30%] p-4 bg-white flex flex-col gap-4'>
                        <h4 className='text-2xl font-semibold text-center'>Find a Trip</h4>
                        <form className=' flex flex-col gap-2 w-full'>
                            <input className=' bg-[#eee] px-8 py-2 text-base rounded-lg w-full' type="text" placeholder='Add Pickup Location' onClick={fullSearchhandler} />
                            <div className='h-10 absolute w-1 bg-black translate-y-2/3 translate-x-3'></div>
                            <input className=' bg-[#eee] px-8 py-2 text-base rounded-lg w-full' type="text" placeholder='Add Drop Location' onClick={fullSearchhandler} />
                        </form>
                    </div>
                    <div className=' bg-red-500 h-[0]'>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserHome