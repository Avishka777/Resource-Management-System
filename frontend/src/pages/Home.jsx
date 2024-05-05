import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../asserts/image.jpg';

export default function Home() {
  return (
    <div className="container" style={{ marginTop: '5rem' }}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div className="col">
          <div className="card h-100 border-0">
            <img className="card-img-top" src="https://media.istockphoto.com/id/1459955387/photo/cricket-ball-hitting-wicket-stumps-knocking-bails-out.jpg?s=2048x2048&w=is&k=20&c=Sx6YbOaFGl94wliBZPoDBlm8ht2LERuVAmmWxmWgUGM=" alt="Card image cap" style={{ borderRadius: '2rem'  }} />
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0">
          <img className="card-img-top" src="https://media.istockphoto.com/id/1459955387/photo/cricket-ball-hitting-wicket-stumps-knocking-bails-out.jpg?s=2048x2048&w=is&k=20&c=Sx6YbOaFGl94wliBZPoDBlm8ht2LERuVAmmWxmWgUGM=" alt="Card image cap" style={{ borderRadius: '2rem'  }} />
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0">
          <img className="card-img-top" src="https://media.istockphoto.com/id/1459955387/photo/cricket-ball-hitting-wicket-stumps-knocking-bails-out.jpg?s=2048x2048&w=is&k=20&c=Sx6YbOaFGl94wliBZPoDBlm8ht2LERuVAmmWxmWgUGM=" alt="Card image cap" style={{ borderRadius: '2rem'  }} />
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0">
          <img className="card-img-top" src="https://media.istockphoto.com/id/1459955387/photo/cricket-ball-hitting-wicket-stumps-knocking-bails-out.jpg?s=2048x2048&w=is&k=20&c=Sx6YbOaFGl94wliBZPoDBlm8ht2LERuVAmmWxmWgUGM=" alt="Card image cap" style={{ borderRadius: '2rem'  }} />
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Browse by Resources or Facility type</h2>

      <div className="container" style={{ marginTop: '5rem' }}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 g-4">
          <div className="col">
            <div className="card border-0" style={{ width: '16rem' }}>
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2013/07/13/09/46/cricket-155965_1280.png" alt="Card image cap" style={{ borderRadius: '2rem', height:'16rem' }} />
              <div className="card-body">
                <h5 className="card-title">Bats</h5>
                <p className="card-text">2 Bats</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0" style={{ width: '16rem' }}>
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2017/01/31/23/16/ball-2028095_1280.png" alt="Card image cap" style={{ borderRadius: '2rem', height:'16rem' }} />
              <div className="card-body">
                <h5 className="card-title">Volley Ball</h5>
                <p className="card-text">5 Volley Balls</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0" style={{ width: '16rem' }}>
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2016/03/31/15/04/badminton-1292970_1280.png" alt="Card image cap" style={{ borderRadius: '2rem', height:'16rem' }} />
              <div className="card-body">
              <h5 className="card-title">Shuttlecocks</h5>
                <p className="card-text">0 Shuttlecocks</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0" style={{ width: '16rem' }}>
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2022/05/23/16/05/table-tennis-7216580_1280.png" alt="Card image cap" style={{ borderRadius: '2rem' , height:'16rem'}} />
              <div className="card-body">
                <h5 className="card-title">Table Tennis</h5>
                <p className="card-text">3 Table Tennis</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0" style={{ width: '16rem' }}>
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2013/07/12/14/07/basketball-147794_1280.png" alt="Card image cap" style={{ borderRadius: '2rem', height:'16rem' }} />
              <div className="card-body">
                <h5 className="card-title">Basket Ball</h5>
                <p className="card-text">5 Basket Ball</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
