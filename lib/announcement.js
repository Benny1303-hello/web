// The site-wide announcement popup (components/AnnouncementPopup.js), mirroring
// a post on the TTC Facebook page. To publish a new one, replace this object:
// give it a NEW `id` (visitors who closed the previous one will then see it),
// set the window it should show in, and drop the post's image in
// public/announcements/. Set `announcement` to null to show nothing.
//
// Times carry the +07:00 offset so the window opens and closes on Vietnam
// time regardless of the visitor's own time zone.
export const announcement = {
  id: 'nghi-le-24-11-2026',
  startsAt: '2026-11-16T00:00:00+07:00',
  endsAt: '2026-11-25T00:00:00+07:00',
  facebookUrl:
    'https://www.facebook.com/permalink.php?story_fbid=pfbid0Toc1D2qHjG8SmDATDUFuaysptshXN1LJA5Br99qVNN3pQR5dcLuKXBH7ZAjCTBxil&id=100054594212925',
  // The image is the post's own artwork. Its text is Vietnamese, so it's only
  // shown in that language; other languages get `content` as plain text.
  image: {
    src: '/announcements/nghi-le-24-11-2026.jpg',
    width: 512,
    height: 640,
    language: 'vi',
  },
  content: {
    vi: {
      title: 'Thông báo lịch nghỉ lễ Ngày Văn hóa Việt Nam 24/11/2026',
      lines: [
        'Kính gửi Quý Khách hàng, Quý Đối tác,',
        'TTC-Infotech trân trọng thông báo lịch nghỉ lễ Ngày Văn hóa Việt Nam:',
        'Nghỉ lễ: Thứ Ba, 24/11/2026',
        'Làm việc trở lại: Thứ Tư, 25/11/2026',
        'Kính mong Quý Khách hàng, Quý Đối tác sắp xếp kế hoạch giao dịch và yêu cầu dịch vụ phù hợp với lịch nghỉ nêu trên.',
        'Kính chúc Quý Khách hàng, Quý Đối tác cùng gia đình một kỳ nghỉ lễ vui vẻ và hạnh phúc!',
      ],
    },
    en: {
      title: 'Holiday notice: Vietnam Culture Day, 24 November 2026',
      lines: [
        'Dear valued Customers and Partners,',
        'TTC-Infotech would like to announce our holiday schedule for Vietnam Culture Day:',
        'Closed: Tuesday, 24 November 2026',
        'Back to work: Wednesday, 25 November 2026',
        'Please plan your orders and service requests around these dates.',
        'Wishing you and your families a happy and joyful holiday!',
      ],
    },
  },
};
