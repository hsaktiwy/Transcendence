import './style-component.css'

function StatsComponent()
{
    return(
        <>
            <div className='stats-div'>
                    <div className='frist-stats-section'>
                        <div className='name-leve-section'>
                            <div className='pos-name'>
                                <h1 className='name-section'>Hamza Chahboune</h1>
                                <h3 style={{fontWeight: '300'}}>@hachahbo</h3>
                            </div>
                            <div className='level-section'>
                                <div className='level-div'>
                                    <h1 style={{paddingLeft: '15px', paddingTop: '15px', fontWeight: '500', fontSize: '15px'}}>Your progress</h1>
                                    <h1 style={{paddingLeft: '15px', paddingTop: '2px', fontWeight: '500', fontSize: '15px', margin: '0px 41%'}}>50%</h1>

                                    <div className='blank-level'>
                                        <div className='score-level'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='chart-section'>
                            <img style={{width: '300px'}}  src="/images/chart2.svg" />
                        </div>
                    </div>
                    <div className='second-stats-section'>
                        <div className='wins-stats-section'>
                            <div className='wins-lose'>
                                <img style={{width: '290px', marginTop:'3px'}}  src="/images/chart1.svg" />
                            </div>
                        </div>
                        <div className='wins-stats-section'>
                            <div className='wins-lose-orgin' >
                                    <div className='wins-lose-div'>
                                        <h1 style={{fontWeight: '400', fontSize:'14px'}}>Last games</h1>
                                        <div className='wins-lose-player'>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                            <div className='score-game'>
                                            <h1 style={{fontWeight: '400'}}>10 - 4</h1>

                                            </div>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                                
                                        </div>
                                        <div className='wins-lose-player'>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                            <div className='score-game'>
                                            <h1 style={{fontWeight: '400'}}>10 - 4</h1>

                                            </div>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                                
                                        </div>
                                        <div className='wins-lose-player'>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                            <div className='score-game'>
                                            <h1 style={{fontWeight: '400'}}>10 - 4</h1>

                                            </div>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                                
                                        </div>
                                        <div className='wins-lose-player'>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                            <div className='score-game'>
                                            <h1 style={{fontWeight: '400'}}>10 - 4</h1>

                                            </div>
                                            <img style={{width: '35px'}}  src="/images/Frame 28.svg" />
                                                
                                        </div>
                                    </div>
                            </div>                            
                        </div>
                    </div>
                </div>
        </>
    )
}

export default StatsComponent