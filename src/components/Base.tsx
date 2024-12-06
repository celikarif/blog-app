import React from 'react';
import CustomNavbar from './CustomNavbar';

interface Base {
  title: string;
  description?: string; 
  children?: React.ReactNode; 
}

const Base: React.FC<Base> = ({ title, description , children  }) => {
  return (
    <div className="container-fluid p-0 m-0 ">
         <CustomNavbar
        brandName="BlogApp"
        links={[
          { href: "/posts", label: "Posts" },
          { href: "/authors", label: "Authors" },
          {href:"/categories" , label:"Category"}
        ]}
      >
      </CustomNavbar>
    </div>
  );
};

export default Base;
