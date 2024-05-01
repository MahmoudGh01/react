import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/payment');

  };

  return (

    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Velit numquam eligendi quos.
      </div>

      <div className="grid">
        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: '6px' }}>
              <div className="text-900 font-medium text-xl mb-2">Basic</div>
              <div className="text-600">Plan description</div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900">$9</span>
                <span className="ml-2 font-medium text-600">per month</span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Arcu vitae elementum</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Dui faucibus in ornare</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Morbi tincidunt augue</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
              <Button variant="contained" color="primary" onClick={handleSubmit} >Buy Now</Button> {}
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: '6px' }}>
              <div className="text-900 font-medium text-xl mb-2">Premium</div>
              <div className="text-600">Plan description</div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900">$29</span>
                <span className="ml-2 font-medium text-600">per month</span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Arcu vitae elementum</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Dui faucibus in ornare</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Morbi tincidunt augue</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Duis ultricies lacus sed</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-none surface-border" />
              <Button variant="contained" color="primary">Buy Now</Button> {/* Use Button component */}
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 flex flex-column surface-card" style={{ borderRadius: '6px' }}>
              <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
              <div className="text-600">Plan description</div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900">$49</span>
                <span className="ml-2 font-medium text-600">per month</span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Arcu vitae elementum</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Dui faucibus in ornare</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Morbi tincidunt augue</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Duis ultricies lacus sed</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Imperdiet proin</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2"></i>
                  <span className="text-900">Nisi scelerisque</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-none surface-border" />
              <Button variant="contained" color="primary">Buy Now</Button> {/* Use Button component */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Pricing;