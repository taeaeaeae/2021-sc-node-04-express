module.exports = (page = 1, totalRecord, listCnt = 5, pagerCnt = 3) => {
    page = Number(page);
    totalRecord = Number(totalRecord);
    listCnt = Number(listCnt);
    pagerCnt = Number(pagerCnt);
    let totalPage = Math.ceil(totalRecord / listCnt);
    let startIdx = (page - 1) * listCnt;
    let startPage = Math.floor((page - 1) / pagerCnt) * pagerCnt + 1;
    let endPage = startPage + pagerCnt - 1;
    let nextPage = page + 1;
    let prevPage = page - 1;
    let nextPager = endPage + 1;
    let prevPager = startPage - 1;
    if (endPage > totalPage) endPage = totalPage;
    if (prevPage < 1) prevPage = 1;
    if (nextPage > totalPage) nextPage = totalPage;
    if (prevPager < 1) prevPager = 1;
    if (nextPager > totalPage) nextPager = totalPage;
    return {
      page,
      totalRecord,
      listCnt,
      pagerCnt,
      totalPage,
      startIdx,
      startPage,
      endPage,
      nextPage,
      prevPage,
      nextPager,
      prevPager,
    };
  };