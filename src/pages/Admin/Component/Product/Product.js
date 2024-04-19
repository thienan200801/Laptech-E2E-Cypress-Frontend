import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";
import * as ProductService from "../../../../services/ProductService";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as AiIcons from "react-icons/ai";
import { getBase64 } from "../../../../utils";
import { Modal, Table } from "antd";
import { Upload } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";

const cx = classNames.bind(styles);

const Product = () => {
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
  const [newType, setNewType] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [isDropdownType, setIsDropdownType] = useState(false);
  const [isDropdownCompany, setIsDropdownCompany] = useState(false);
  const [Data, setData] = useState([]);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    company: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    image: "",
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    type: "",
    company: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    image: "",
  });
  const user = useSelection((state) => state?.user);
  const numberFormat = new Intl.NumberFormat("en-US");

  const mutation = useMutationHook((data) =>
    ProductService.createProduct(data)
  );
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} width={150} alt="Uploaded Image" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <div>{numberFormat.format(price)}đ</div>,
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (description) => (
        <div
          style={{
            overflow: "scroll",
            display: "-webkit-box",
            height: "120px",
            WebkitLineClamp: "2",
            lineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >
          {description}
        </div>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
          <AiIcons.AiOutlineDelete
            className={cx("AiIcons")}
            color="red"
            onClick={() => {
              handleDeleteProduct(record);
            }}
          />
          <AiIcons.AiOutlineEdit
            className={cx("AiIcons")}
            color="#F0E68C"
            onClick={() => {
              handleDetailProduct(record);
            }}
          />
        </div>
      ),
    },
  ];
  const [listType, setListType] = useState([
    {
      id: 1,
      name: "normal-laptop",
    },
    {
      id: 2,
      name: "gaming-laptop",
    },
    {
      id: 3,
      name: "normal-PC",
    },
    {
      id: 3,
      name: "gaming-PC",
    },
  ]);

  const [listCompany, setListCompany] = useState([
    {
      id: 1,
      name: "ASUS",
    },
    {
      id: 2,
      name: "LENOVO",
    },
    {
      id: 3,
      name: "MSI",
    },
    {
      id: 3,
      name: "DELL",
    },
    {
      id: 3,
      name: "ACER",
    },
  ]);

  const { isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const { data: dataDeleted, isLoading: isLoadingDeleted } = mutationDeleted;
  // add product

  //Fetch ALL data
  const fetchProductAll = async () => {
    try {
      const res = await ProductService.getAllProduct();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProductAll();
        setData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Thêm sản phẩm thành công");
      console.log(mutation.data.status);
      window.location.reload();
    } else if (isError) {
      alert(mutation.data);
    } else if (
      isSuccess &&
      mutation.data.message === "Tên sản phẩm đã tồn tại"
    ) {
      alert("Mã sản phẩm đã tồn tại");
    }
  }, [isSuccess, isError]);

  const handleOkAddProduct = () => {
    console.log("stateProduct", stateProduct);
    mutation.mutate(stateProduct);

    setIsModalOpenAddProduct(false);
  };
  const handleCancelAddProduct = () => {
    setIsModalOpenAddProduct(false);
  };
  const handleOnChange = (event) => {
    setStateProduct({
      ...stateProduct,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  //Edit product

  const handleDetailProduct = (record) => {
    setRowSelected(record._id);
    fetchGetDetailsProduct(record._id);
    setIsModalOpenEditProduct(true);
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    try {
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res?.data?.name,
          type: res?.data?.type,
          company: res?.data?.company,
          price: res?.data?.price,
          countInStock: res?.data?.countInStock,
          rating: res?.data?.rating,
          description: res?.data?.description,
          image: res?.data?.image,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleOkEditProduct = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.accessToken,
      ...stateProductDetails,
    });
  };
  const handleCancelEditProduct = () => {
    setStateProductDetails({
      name: "",
      type: "",
      company: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
      image: "",
    });
    setIsModalOpenEditProduct(false);
  };
  const handleOnChangeDetails = (event) => {
    setStateProductDetails({
      ...stateProductDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnChangeImageDetails = async ({ fileList }) => {
    try {
      const file = fileList[0];
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProductDetails({
        ...stateProductDetails,
        image: file.preview,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isSuccessUpdated) {
      alert("Cập nhật thành công");
      window.location.reload();
    }
  }, [isSuccessUpdated]);

  //Delete product
  const handleDeleteProduct = (record) => {
    if (window.confirm("Bạn có muốn xoá sản phẩm này không?")) {
      mutationDeleted.mutate({
        id: record._id,
        token: user?.accessToken,
      });
    }
  };

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      alert("Xóa thành công");
      window.location.reload();
    }
  }, [dataDeleted]);

  useEffect(() => {
    if (newType) {
      // Update the list of types with the new type
      setListType((prevList) => [
        ...prevList,
        { id: prevList.length + 1, name: newType },
      ]);

      // Select the new type
      setStateProduct({
        ...stateProduct,
        type: newType,
      });
    }
  }, [newType]);

  useEffect(() => {
    if (newCompany) {
      // Update the list of companies with the new company
      setListCompany((prevList) => [
        ...prevList,
        { id: prevList.length + 1, name: newCompany },
      ]);

      // Select the new company
      setStateProduct({
        ...stateProduct,
        company: newCompany,
      });
    }
  }, [newCompany]);

  return (
    <div className={cx("container")}>
      <p>Quản lí sản phẩm</p>
      <div
        className={cx("add")}
        onClick={() => {
          setIsModalOpenAddProduct(true);
        }}
      >
        +
      </div>
      <div className={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpenAddProduct}
        onOk={handleOkAddProduct}
        onCancel={handleCancelAddProduct}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={handleOkAddProduct}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleOkAddProduct}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Type:</p>

            <input
              type="button"
              value={stateProduct.type}
              onChange={handleOnChange}
              onClick={() => {
                setIsDropdownType(!isDropdownType);
              }}
              name="type"
            />
          </div>

          {isDropdownType ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listType.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    key={item.id}
                    onClick={() => {
                      setIsDropdownType(!isDropdownType);
                      setStateProduct({
                        ...stateProduct,
                        type: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
                {/* Add option to add a new Type */}
                <div
                  className={cx("dropdownitem")}
                  onClick={() => {
                    setIsDropdownType(!isDropdownType);
                    setNewType(prompt("Enter a new Type:"));
                  }}
                >
                  <p>Add New Type</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className={cx("modal-input")}>
            <p>Company:</p>
            <input
              type="button"
              value={stateProduct.company}
              onChange={handleOnChange}
              onClick={() => {
                setIsDropdownCompany(!isDropdownCompany);
              }}
              name="company"
            />
          </div>
          {isDropdownCompany ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listCompany.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    key={item.id}
                    onClick={() => {
                      setIsDropdownCompany(!isDropdownCompany);
                      setStateProduct({
                        ...stateProduct,
                        company: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
                {/* Add option to add a new Company */}
                <div
                  className={cx("dropdownitem")}
                  onClick={() => {
                    setIsDropdownCompany(!isDropdownCompany);
                    setNewCompany(prompt("Enter a new Company:"));
                  }}
                >
                  <p>Add New Company</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className={cx("modal-input")}>
            <p>Price:</p>
            <input
              type="number"
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>countInStock:</p>
            <input
              type="number"
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </div>

          <div className={cx("modal-input")}>
            <p>Description</p>
            <input
              type="text"
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image</p>
            <Upload onChange={handleOnChangeImage}>
              {stateProduct.image ? (
                <img
                  src={stateProduct.image}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100px" }}
                />
              ) : (
                <input
                  type="file"
                  value={stateProduct.image}
                  onChange={handleOnChange}
                  name="image"
                />
              )}
            </Upload>
          </div>
        </div>
      </Modal>
      <Modal
        title="Basic Modal"
        open={isModalOpenEditProduct}
        onOk={handleOkEditProduct}
        onCancel={handleCancelEditProduct}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={handleCancelEditProduct}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleOkEditProduct}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateProductDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Type:</p>

            <input
              type="button"
              value={stateProductDetails.type}
              onChange={handleOnChangeDetails}
              onClick={() => {
                setIsDropdownType(!isDropdownType);
              }}
              name="type"
            />
          </div>

          {isDropdownType ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listType.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    onClick={() => {
                      setIsDropdownType(!isDropdownType);
                      setStateProductDetails({
                        ...stateProductDetails,
                        type: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className={cx("modal-input")}>
            <p>Company:</p>
            <input
              type="button"
              value={stateProductDetails.company}
              onChange={handleOnChangeDetails}
              onClick={() => {
                setIsDropdownCompany(!isDropdownCompany);
              }}
              name="company"
            />
          </div>
          {isDropdownCompany ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listCompany.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    onClick={() => {
                      setIsDropdownCompany(!isDropdownCompany);
                      setStateProductDetails({
                        ...stateProductDetails,
                        company: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className={cx("modal-input")}>
            <p>Price:</p>
            <input
              type="number"
              value={stateProductDetails.price}
              onChange={handleOnChangeDetails}
              name="price"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>countInStock:</p>
            <input
              type="number"
              value={stateProductDetails.countInStock}
              onChange={handleOnChangeDetails}
              name="countInStock"
            />
          </div>

          <div className={cx("modal-input")}>
            <p>Description</p>
            <input
              type="text"
              value={stateProductDetails.description}
              onChange={handleOnChangeDetails}
              name="description"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image</p>
            <Upload
              onChange={handleOnChangeImageDetails}
              // fileList={
              //   stateProductDetails.image
              //     ? [{ uid: "-1", name: "image.png", status: "done" }]
              //     : []
              // }
            >
              {stateProductDetails.image ? (
                <img
                  src={stateProductDetails.image}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100px" }}
                />
              ) : (
                <input
                  type="file"
                  value={stateProductDetails.image}
                  onChange={handleOnChangeDetails}
                  name="image"
                />
              )}
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
