import { CommentProps } from "../../model/commentInterface";
import { Collapse, ConfigProvider, CollapseProps } from "antd";
import moment from "moment";
import { URL_IMG_AVA } from "../../services/config";

interface Props {
  comment: CommentProps[] | null;
}

export const ListComment: React.FC<Props> = ({ comment }) => {
  const renderComment = () => {
    if (comment?.length !== 0) {
      return comment?.map((item) => {
        return (
          <div key={item.binh_luan_id} className='flex items-center space-x-4'>
            <div>
              <img
                loading='lazy'
                src={
                  item.nguoi_dung.anh_dai_dien.includes("https")
                    ? item.nguoi_dung.anh_dai_dien
                    : `${URL_IMG_AVA}/${item.nguoi_dung.anh_dai_dien}`
                }
                alt='avatar'
                className='rounded-full w-8 h-8'
              />
            </div>
            <div>
              <div className='flex items-center'>
                <h3 className='font-semibold mr-3'>{item.nguoi_dung.ho_ten}</h3>
                <p>{item.noi_dung}</p>
              </div>
              <span className='text-gray-500 text-sm'>{moment(item.ngay_binh_luan).endOf("hour").fromNow()}</span>
            </div>
          </div>
        );
      });
    } else {
      return <h3 className='text-gray-400 mt-4'>Chưa có nhận xét nào! Thêm nhận xét để bắt đầu cuộc trò chuyện.</h3>;
    }
  };
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <p className='font-semibold'>Nhận xét</p>,
      children: renderComment(),
    },
  ];

  return (
    <div className='comment__list h-48 overflow-y-auto'>
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerPadding: "0px",
              contentPadding: "0px",
            },
          },
        }}>
        <Collapse
          expandIconPosition='end'
          items={items}
          ghost
          defaultActiveKey={"1"}
          expandIcon={(e) => {
            const { isActive } = e;
            if (comment) {
              return (
                <span>
                  {isActive ? (
                    <i className='angle fa-solid fa-angle-up font-bold text-xl'></i>
                  ) : (
                    <i className='angle fa-solid fa-angle-down font-bold text-xl'></i>
                  )}
                </span>
              );
            } else {
              return "";
            }
          }}
        />
      </ConfigProvider>
    </div>
  );
};
