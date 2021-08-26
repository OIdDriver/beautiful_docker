//每天 140M 回本
const  groupBy = (array, f) => {
    let groups = {};
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
};
 
const arrayGroupBy = (list, groupId) => {
    let sorted = groupBy(list, function (item) {
        return [item[groupId]];
    });
    return sorted;
};

const converToM = (traffic) => {
	let numStr = traffic.replace(' KB','').replace(' MB','');
	if(traffic.indexOf('GB')>-1){
		return parseFloat(numStr)*1024;
	}
    else if(traffic.indexOf('MB')>-1){
		return parseFloat(numStr);
	}
	else if(traffic.indexOf('KB')>-1){
		return parseFloat(numStr)/1024;
	}
	else{
		return 0;
	}
};

let listData = temp1.peers || temp1;
let ipList = arrayGroupBy(listData,'ip'); 
let newList = [];
for(i=0;i<ipList.length;i++){
	if(ipList[i] && ipList[i].length>0){
		let newHost = JSON.parse(JSON.stringify(ipList[i][0]));		
		newHost.totalTraffic = converToM(newHost.totalTraffic);
		newHost.sub=[];
		newHost.sub.push(ipList[i][0]);
		for(j=1;j<ipList[i].length;j++){
			let host = ipList[i][j];
			newHost.totalTraffic += converToM(host.totalTraffic);
			newHost.sub.push(host);
		};
		newList.push(newHost);
	}
};
newList.sort(function (a, b) {
  return a.totalTraffic-b.totalTraffic;
});

for(i=0;i<newList.length;i++){
    console.info(newList[i].type,newList[i].ip,newList[i].isp,Math.floor(newList[i].totalTraffic) + 'M');
};
