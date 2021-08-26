temp1.peers.sort(function (a, b) {
  if (a.totalTraffic.indexOf('MB')>-1 && b.totalTraffic.indexOf('KB')>-1){
	return 1
  }
  else if (a.totalTraffic.indexOf('MB')>-1 && b.totalTraffic.indexOf('MB')>-1){
	return parseFloat(a.totalTraffic.replace(' MB',''))-parseFloat(b.totalTraffic.replace(' MB',''))
  }
  else if (a.totalTraffic.indexOf('KB')>-1 && b.totalTraffic.indexOf('MB')>-1){
	return -1
  }
  else if (a.totalTraffic.indexOf('KB')>-1 && b.totalTraffic.indexOf('KB')>-1){
	return parseFloat(a.totalTraffic.replace(' KB',''))-parseFloat(b.totalTraffic.replace(' KB',''))
  }
});
for(i=0;i<temp1.peers.length;i++){
    console.info(temp1.peers[i].type,temp1.peers[i].ip,temp1.peers[i].isp,temp1.peers[i].totalTraffic);
}
