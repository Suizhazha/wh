function clock () {
  // 实例化当前时间
  let time = new Date();
  //年月日周
  let y = time.getFullYear(),
    m = time.getMonth() + 1,
    day = time.getDate(),
    week = toWeek(time.getDay());
}
console.log(clock());