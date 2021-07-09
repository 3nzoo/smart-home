import laptop from '../images/macbook-pro-13_overview__bcsyunk73i2a_og.jpeg'
import lamp from '../images/photo-1568060327141-c459eaeb6bf2.jpeg'
import harddrive from '../images/getPhoto.png'
import maccharger from '../images/macbook-pro-magsafe.jpeg'
import charger from '../images/iPhone-charger.png';
import ref from '../images/8944748625950.png'
import screen from '../images/https___aoc-pim.s3.amazonaws.com_ag493ucx_AG492UCX_FTL_HERO_A.png'
import axios from 'axios'

let itemData = [
    {
        img:laptop,
        title:'Laptop',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/laptop');
            console.log('harddrive switched');
        }  
    },
    {
        img:lamp,
        title:'lamp',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/lamp');
            console.log('lamp switched');
        }
    },
    {
        img:harddrive,
        title:'hard drive',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/harddrive');
            console.log('harddrive switch');
        }
    },

    {
        img:ref,
        title:'Ref',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/ref');
            console.log('Ref switched');
        }
    },
    {
        img:maccharger,
        title:'Mac Charger',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/mCharger');
            console.log('Mac Charger switched');
        }
    },
    {
        img:charger,
        title:'Charger',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/charger');
            console.log('charger switched');
        }
    },
    {
        img:screen,
        title:'Monitor',
        status:'...',
        toggle: async () =>{
            await axios.get('http://localhost:4005/screen');
            console.log('Monitor switched');
        }
    },
]


async function getItems(){
    const devices = await axios.get('http://localhost:4005/all');
    devices.data.map((item) =>{
         const newItem = item.name.toLowerCase().replace(/\s/g,'')
         return itemData.map(current =>{
            if(current.title.toLowerCase().toString().replace(/\s/g,'') === newItem){
                current.status = item.status
                // console.log(item.name+' '+ item.status)
            }
            if(current.title.toLowerCase().toString().replace(/\s/g,'') === 'monitor' && newItem ==='screen'){
                current.status=item.status;
            }
            return current.status
        })
    });

    console.log(itemData)
}

getItems();


export default itemData