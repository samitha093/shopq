import './css/Dashboard.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Dashboard = () => {

    const data = [
        {
          date: '1',
          Sales: 4000,
          Returns: 2400,
        },
        {
          date: '2',
          Sales: 3000,
          Returns: 1398,
        },
        {
          date: '3',
          Sales: 2000,
          Returns: 9800,
        },
        {
          date: '4',
          Sales: 2780,
          Returns: 3908,
        },
        {
          date: '5',
          Sales: 1890,
          Returns: 4800,
        },
        {
          date: '6',
          Sales: 2390,
          Returns: 3800,
        },
        {
          date: '7',
          Sales: 3490,
          Returns: 4300,
        },
        {
            date: '8',
            Sales: 4000,
            Returns: 2400,
          },
          {
            date: '9',
            Sales: 3000,
            Returns: 1398,
          },
          {
            date: '10',
            Sales: 2000,
            Returns: 9800,
          },
          {
            date: '11',
            Sales: 2780,
            Returns: 3908,
          },
          {
            date: '12',
            Sales: 1890,
            Returns: 4800,
          },
          {
            date: '13',
            Sales: 2390,
            Returns: 3800,
          },
          {
            date: '14',
            Sales: 3490,
            Returns: 4300,
          },
          {
            date: '15',
            Sales: 4000,
            Returns: 2400,
          },
          {
            date: '16',
            Sales: 3000,
            Returns: 1398,
          },
          {
            date: '17',
            Sales: 2000,
            Returns: 9800,
          },
          {
            date: '1',
            Sales: 2780,
            Returns: 3908,
          },
          {
            date: '18',
            Sales: 1890,
            Returns: 4800,
          },
          {
            date: '19',
            Sales: 2390,
            Returns: 3800,
          },
          {
            date: '20',
            Sales: 3490,
            Returns: 4300,
          },
      ];
      

    return (
        <div className="seller-dashboard">
            <div className="dashboardtop">
                <div className ="dashboardItem">
                    <span className="dashboardTitle">Revanue</span>
                    <div className ="dashboardContainer">
                        <span className="dashboardMoney">$2,678</span>
                        <span className="dashboardRate">
                            -11.4 < ArrowUpwardIcon className="dashboardIcon"/>
                        </span>
                    </div>
                    <span className="dashboardSub">Compared to last month</span>
                </div>
                <div className ="dashboardItem">
                    <span className="dashboardTitle">Sales</span>
                    <div className ="dashboardContainer">
                        <span className="dashboardMoney">$6,698</span>
                        <span className="dashboardRate">
                            -171.4 < ArrowUpwardIcon className="dashboardIcon"/>
                        </span>
                    </div>
                    <span className="dashboardSub">Compared to last month</span>
                </div>
                <div className ="dashboardItem">
                    <span className="dashboardTitle">Refund</span>
                    <div className ="dashboardContainer">
                        <span className="dashboardMoney">$178</span>
                        <span className="dashboardRate">
                            -1.4 <ArrowUpwardIcon className="dashboardIcon"/>
                        </span>
                    </div>
                    <span className="dashboardSub">Compared to last month</span>
                </div>
           </div>
           <div className="dashboardgraph">
                <h3 className="chartTitle">Sales Analytics</h3>
                <ResponsiveContainer width="100%" aspect={4/1}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" stroke="#5550bd"/>
                        <Line type="monotone" dataKey="Sales" stroke="#2ECC71"/>
                        <Line type="monotone" dataKey="Returns" stroke="#E67E22"/>
                        <Tooltip/>
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                    </LineChart>
                </ResponsiveContainer>
           </div>
        </div>
    )
}

export default Dashboard
 