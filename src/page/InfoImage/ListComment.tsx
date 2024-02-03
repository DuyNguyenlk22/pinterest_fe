import { useEffect, useState } from "react";
import { getCommentImg } from "../../services/api";
import { useParams } from "react-router-dom";
import { CommentProps } from "../../model/commentInterface";
import { Collapse, ConfigProvider, CollapseProps } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../redux/slice/commentSlice";

export const ListComment: React.FC = () => {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const [comment, setComment] = useState<CommentProps[] | null>(null);

  let getComment = async () => {
    try {
      let res = await getCommentImg(id);
      setComment(res.data.content);
      dispatch(setQuantity(res.data.content.length));
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };
  useEffect(() => {
    getComment();
  }, [id]);

  const renderComment = () => {
    if (comment?.length !== 0) {
      return comment?.map((item) => {
        return (
          <div key={item.binh_luan_id} className='flex items-center space-x-4'>
            <div>
              <img src={item.nguoi_dung.anh_dai_dien} alt='...' className='rounded-full w-8 h-8' />
            </div>
            <div>
              <div className='flex items-center'>
                <h3 className='font-semibold mr-3'>{item.nguoi_dung.ho_ten}</h3>
                <p>{item.noi_dung}</p>
              </div>
              <span className='text-gray-500 text-sm'>
                {moment(item.ngay_binh_luan).startOf("weeks").fromNow()}
              </span>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h3 className='text-gray-400 mt-4'>
          Chưa có nhận xét nào! Thêm nhận xét để bắt đầu cuộc trò chuyện.
        </h3>
      );
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
