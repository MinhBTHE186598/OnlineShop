import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function AboutUs() {
    return (
        <div>
            <Header />
            <div class="bg-light">
                <div class="container py-5">
                    <div class="row h-100 align-items-center py-5">
                        <div class="col-lg-6">
                            <h1 class="display-4"><b>VỀ CHÚNG TÔI</b></h1>
                            <p class="lead text-muted mb-0">Chợ Sinh Viên là một trang web bán hàng trực tuyến
                            theo mô hình Chợ Cộng Đồng, được lập ra để giúp sinh viên trong khu vực Hoà Lạc
                            tìm kiếm đồ dùng giá rẻ một cách thuận tiện và hiệu quả nhất, cũng như tạo
                            ra một nền tảng bán hàng trực tuyến dành cho các doanh nghiệp nhỏ trong khu vực.</p>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" class="img-fluid" /></div>
                    </div>
                </div>
            </div>

            <div class="bg-white py-5">
                <div class="container py-5">
                    <div class="row align-items-center mb-5">
                        <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                            <h2 class="font-weight-light">Mua từ bất cứ đâu!</h2>
                            <p class="font-italic text-muted mb-4">Với nền tảng trực tuyến, chỉ cần một
                            cái nháy chuột hay một cú chạm tay, hàng sẽ đến ngay trước cửa nhà bạn.
                            <br/>
                            (Xin lưu ý: vì đây là dự án sinh viên, nên phạm vi sẽ được giới hạn trong khu vực Hoà Lạc)</p><a href="/" class="btn btn-light px-5 rounded-pill shadow-sm">Tìm Hiểu Thêm</a>
                        </div>
                        <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-5 px-5 mx-auto"><img src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
                        <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                            <h2 class="font-weight-light">Hàng trăm sản phẩm đa dạng!</h2>
                            <p class="font-italic text-muted mb-4">Trang web bao gồm hàng trăm sản phẩm đến từ nhiều doanh nghiệp nhỏ trong khu vực, đảm bảo
                             về độ đa dạng sản phẩm cũng như mức giá phải chăng cho các bạn sinh viên.</p><a href="/" class="btn btn-light px-5 rounded-pill shadow-sm">Mua sắm ngay!</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-light py-5">
                <div class="container py-5">
                    <div class="row mb-4">
                        <div class="col-lg-5">
                            <h2 class="display-4 font-weight-light">Nhóm của chúng tôi</h2>
                            <p class="font-italic text-muted">Các thành viên trong ban dự án.</p>
                        </div>
                    </div>

                    <div class="row text-center">

                        <div class="col-xl-4 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Bùi Tuấn Minh</h5><span class="small text-uppercase text-muted">Leader</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaFacebook /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaGithub /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><AiFillTikTok /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaTwitter /></a></li>
                                </ul>
                            </div>
                        </div>



                        <div class="col-xl-2 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Lê Anh Đức</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><FaFacebook /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaGithub /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><AiFillTikTok /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaTwitter /></a></li>
                                </ul>
                            </div>
                        </div>



                        <div class="col-xl-2 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Nguyễn Đức Trung</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><FaFacebook /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaGithub /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><AiFillTikTok /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaTwitter /></a></li>
                                </ul>
                            </div>
                        </div>



                        <div class="col-xl-2 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Trần Tuấn Hải</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><FaFacebook /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaGithub /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><AiFillTikTok /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaTwitter /></a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-xl-2 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 class="mb-0">Nguyễn Mạnh Tùng</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><FaFacebook /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaGithub /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><AiFillTikTok /></a></li>
                                    <li class="list-inline-item"><a href="/" class="social-link"><FaTwitter /></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default AboutUs