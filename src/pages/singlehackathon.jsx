import './singlehackathon.css'

export default function Singlehackathon() {
    const hackathon = {
        prize_pool: 30000,
        start_date: '2023/05/02',
        end_date: '2023/05/10',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat dui eget quam vestibulum, in mollis elit fermentum. Aenean tristique lectus condimentum mollis aliquet. Maecenas vehicula tincidunt aliquet. Donec mattis ipsum sit amet varius tincidunt. Maecenas varius eros neque, et bibendum tellus euismod nec. Nulla justo neque, vestibulum eu dolor ut, venenatis congue libero. Curabitur ullamcorper, risus eu lacinia lobortis, dolor libero rutrum lorem, id cursus elit nisl sit amet velit. Aliquam ac pharetra felis. Sed in velit sit amet orci volutpat mollis. Fusce euismod tincidunt tortor, ut varius nibh. Sed urna metus, finibus nec sodales eu, congue vitae sapien. Vivamus imperdiet molestie est quis blandit',
        criteria: { novelty: 'it fermentum. Aenean tristique lectus condimentum mollis aliquet. Maecenas vehicula tincidunt aliquet. Donec mattis ipsum sit amet varius tincidunt. Maecenas varius eros neque, et bibendum tellus euismod nec. Nulla justo neque, vestibulum eu dolor ut, venenatis congue libero. Curabitur ullamcorper, risus eu lacinia lobortis, dolor libero rutrum lorem, id cursus elit nisl sit amet velit. Aliq' }
    };

    return (
        <>
            <div className="container">
                <div className="header"><h3>This is the header placeholder</h3></div>
                <div className='basic'>
                    <h3>SIA App Challenge</h3>
                    <div className='button'><button>Join Hackathon</button></div>
                    <div className='basic_info'>
                        <ul>
                            <li><span>Prize pool - ${hackathon.prize_pool}</span></li>
                            <li><span>Start data - {hackathon.start_date} | End data - {hackathon.end_date}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="project_desc">
                    <div className="title">PROJECT DESCRIPTION</div>
                    <div className="description"><p>{hackathon.description}</p></div>
                </div>
                <div className="project_desc">
                    <div className="title">JUDGING CRITERIA</div>
                    <div className='sub_title'>Novelty & Creativity</div>
                    <div className="description"><p>{hackathon.criteria.novelty}</p></div>
                    <div className='sub_title'>Novelty & Creativity</div>
                    <div className="description"><p>{hackathon.criteria.novelty}</p></div>
                    <div className='sub_title'>Novelty & Creativity</div>
                    <div className="description"><p>{hackathon.criteria.novelty}</p></div>
                </div>
            </div>
        </>
    );
}