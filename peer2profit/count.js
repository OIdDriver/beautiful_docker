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

const converToH = (uptime) => {
	if(uptime){
		var pattern = /(\d+)д.\s*(\d+)ч.(\d+)м.(\d+)сек./
		var times = uptime.match(pattern);
		if(times && times.length==5){
			var total = 0.0;
			total += times[1]*24;
			total += times[2]*1;
			total += times[3]/24;
			return total;
		}
	}
	return 0;
	
};
const getCount = () => {
	let listData = temp1.peers || temp1;
	let ipList = arrayGroupBy(listData,'ip'); 
	let newList = [];
	for(i=0;i<ipList.length;i++){
		if(ipList[i] && ipList[i].length>0){
			let newHost = JSON.parse(JSON.stringify(ipList[i][0]));		
			newHost.totalTraffic = 0;
			newHost.totalHours = 0;
			newHost.sub=[];		
			for(j=0;j<ipList[i].length;j++){
				let host = ipList[i][j];
				newHost.totalTraffic += converToM(host.totalTraffic);
				newHost.totalHours += converToH(host.uptime);
				newHost.sub.push(host);
			};
			newList.push(newHost);
		}
	};
	newList.sort(function (a, b) {
	  return a.totalTraffic-b.totalTraffic;
	});

	for(i=0;i<newList.length;i++){
	    console.info(newList[i].type,newList[i].ip,newList[i].isp,Math.floor(newList[i].totalTraffic) + 'M',Math.floor(newList[i].totalTraffic/(newList[i].totalHours/24))+'M/d',newList[i].sub.length+'Nodes');
	};
}
