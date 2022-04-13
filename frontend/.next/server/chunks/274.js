"use strict";
exports.id = 274;
exports.ids = [274];
exports.modules = {

/***/ 274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* reexport */ MenuModal_MenuModal)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: ./recoil/states.ts
var states = __webpack_require__(1464);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./components/MenuModal/style.tsx

const ModalWrap = (external_styled_components_default()).div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const Modal = (external_styled_components_default()).div`
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 450px;
  background-color: #fff;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding: 20px;

  form {
    width: 100%;
  }

  .file__input {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  .name__input,
  .price__input {
    display: block;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin-right: 20px;
    border-bottom: 1px solid gray;
    margin-bottom: 20px;
    outline: none;
  }

  .content__input {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 12px;
    border: 1px solid gray;
    border-radius: 10px;
    resize: none;
    outline: none;
  }
`;
const CateForm = (external_styled_components_default()).form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cate__input {
    flex: none;
    display: block;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin: 20px 0px;
    border-bottom: 1px solid gray;
    outline: none;
  }

  p {
    color: gray;
    margin-bottom: 10px;
  }
`;
const SummitBtn = (external_styled_components_default()).button`
  display: block;
  height: 24px;
  width: 100%;
  font-weight: 700;
  border-radius: 10px;
  color: var(--color-orange);
  margin-top: auto;
  margin-bottom: 12px;
`;
const ModalCloseBtn = (external_styled_components_default()).button`
  width: 100%;
  height: 14px;
  text-align: right;
`;
const ButtonWrap = (external_styled_components_default()).div`
  margin-top: auto;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;
const Button = (external_styled_components_default()).button`
  border: 1px solid gray;
  padding: 15px;
  font-size: 1.125rem;
  margin-bottom: 10px;
  border-radius: 20px;

  color: gray;
  :last-child {
    margin: 0;
  }
  :hover {
    background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
    color: #fff;
    border: 1px solid #fff;
  }
`;

;// CONCATENATED MODULE: ./components/MenuModal/CategoryAddForm.tsx






const CategoryAddForm = ({ setModalOpen  })=>{
    const menuId1 = (0,external_recoil_.useRecoilValue)(states/* menuIdState */.zx);
    const { 0: categoryName1 , 1: setCategoryName  } = (0,external_react_.useState)("");
    const addNewCategory = async (categoryName, menuId)=>{
        try {
            const data = {
                categoryName: categoryName,
                menuId: menuId
            };
            const response = await external_axios_default().post("http://localhost:8080/category/new", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            setModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const handleCategoryChange = (e)=>{
        setCategoryName(e.target.value);
    };
    const handleCategorySubmit = (e)=>{
        e.preventDefault();
        if (menuId1 !== undefined) {
            addNewCategory(categoryName1, menuId1);
        }
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(CateForm, {
        onSubmit: handleCategorySubmit,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                onChange: handleCategoryChange,
                className: "cate__input",
                name: "categoryName",
                placeholder: "카테고리명을 입력해주세요"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "* 카테고리를 먼저 저장 한 후 음식을 저장해주세요."
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(SummitBtn, {
                className: "submit__btn",
                type: "submit",
                children: "제출하기"
            })
        ]
    }));
};
/* harmony default export */ const MenuModal_CategoryAddForm = (CategoryAddForm);

;// CONCATENATED MODULE: ./components/MenuModal/FoodAddForm.tsx




const FoodAddForm = ({ setModalOpen , categoryId  })=>{
    const { 0: inputs , 1: setInputs  } = (0,external_react_.useState)({
        name: "",
        price: "0",
        content: ""
    });
    const { 0: img , 1: setImg  } = (0,external_react_.useState)(null);
    const addNewFood = async (fd)=>{
        try {
            const response = await external_axios_default().post("http://localhost:8080/food/new", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            setModalOpen(false);
        } catch (err) {
            console.log("error", err);
        }
    };
    const handleFoodChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values)=>({
                ...values,
                [name]: value
            })
        );
    };
    const handleImgChange = (e)=>{
        setImg(e.target.files ? e.target.files[0] : null);
    };
    const handleFoodSubmit = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        if (img !== null) {
            fd.append("file", img);
        }
        fd.append("foodName", inputs["name"]);
        fd.append("foodPrice", inputs["price"]);
        fd.append("foodContent", inputs["content"]);
        fd.append("categoryId", String(categoryId));
        addNewFood(fd);
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
            onSubmit: handleFoodSubmit,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "file",
                    id: "file",
                    name: "file",
                    accept: "image/png, image/jpeg",
                    className: "file__input",
                    onChange: handleImgChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    className: "name__input",
                    name: "name",
                    placeholder: "음식 이름을 입력해주세요.",
                    maxLength: 20,
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    className: "price__input",
                    name: "price",
                    placeholder: "가격을 입력해주세요.",
                    maxLength: 20,
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                    className: "content__input",
                    name: "content",
                    rows: 7,
                    cols: 10,
                    maxLength: 200,
                    placeholder: "메뉴 상세를 입력해주세요.",
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(SummitBtn, {
                    className: "submit__btn",
                    type: "submit",
                    children: "제출하기"
                })
            ]
        })
    }));
};
/* harmony default export */ const MenuModal_FoodAddForm = (FoodAddForm);

;// CONCATENATED MODULE: ./components/MenuModal/FoodUpdateForm.tsx




const FoodUpdateForm = ({ setModalOpen , foodId: foodId1  })=>{
    const { 0: inputs , 1: setInputs  } = (0,external_react_.useState)({
        name: "",
        price: "0",
        content: ""
    });
    const { 0: img , 1: setImg  } = (0,external_react_.useState)(null);
    const updateFood = async (fd, foodId)=>{
        try {
            const response = await external_axios_default().post("http://localhost:8080/food/update", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                },
                params: {
                    foodId: foodId
                }
            });
            console.log(response);
            setModalOpen(false);
        } catch (err) {
            console.log("error", err);
        }
    };
    const deleteFood = async (foodId)=>{
        try {
            const response = await external_axios_default().post("http://localhost:8080/food/delete", {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                params: {
                    foodId: String(foodId)
                }
            });
            console.log(response);
            setModalOpen(false);
            window.location.reload();
        } catch (err) {
            console.log("error", err);
        }
    };
    const handleFoodDelete = (e, foodId)=>{
        e.preventDefault();
        typeof foodId !== "undefined" && deleteFood(foodId);
    };
    const handleImgChange = (e)=>{
        setImg(e.target.files ? e.target.files[0] : null);
    };
    const handleFoodChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values)=>({
                ...values,
                [name]: value
            })
        );
    };
    const handleFoodSubmit = (e, foodId)=>{
        e.preventDefault();
        const fd = new FormData();
        if (img !== null) {
            fd.append("file", img);
        }
        fd.append("foodName", inputs["name"]);
        fd.append("foodPrice", inputs["price"]);
        fd.append("foodContent", inputs["content"]);
        typeof foodId !== "undefined" && updateFood(fd, foodId);
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
            onSubmit: (e)=>handleFoodSubmit(e, foodId1)
            ,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "file",
                    id: "file",
                    name: "file",
                    accept: "image/png, image/jpeg",
                    className: "file__input",
                    onChange: handleImgChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    className: "name__input",
                    name: "name",
                    placeholder: "음식 이름을 입력해주세요.",
                    maxLength: 20,
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    className: "price__input",
                    name: "price",
                    placeholder: "가격을 입력해주세요.",
                    maxLength: 20,
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                    className: "content__input",
                    name: "content",
                    rows: 7,
                    cols: 10,
                    maxLength: 200,
                    placeholder: "메뉴 상세를 입력해주세요.",
                    onChange: handleFoodChange
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ButtonWrap, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                            children: "음식 정보 수정하기"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                            onClick: (e)=>handleFoodDelete(e, foodId1)
                            ,
                            children: "음식 삭제하기"
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const MenuModal_FoodUpdateForm = (FoodUpdateForm);

;// CONCATENATED MODULE: ./components/MenuModal/MenuAddForm.tsx




const MenuAddForm = ({ setModalOpen  })=>{
    const { 0: menuName1 , 1: setMenuName  } = (0,external_react_.useState)("");
    const addNewMenu = async (menuName)=>{
        try {
            const data = {
                menuName: menuName,
                ownerId: "1"
            };
            const response = await external_axios_default().post("http://localhost:8080/menu/new", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            setModalOpen(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleNewMenuSubmit = (e)=>{
        e.preventDefault();
        addNewMenu(menuName1);
    };
    const handleMenuChange = (e)=>{
        console.log(e.target.value);
        setMenuName(e.target.value);
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(CateForm, {
            onSubmit: handleNewMenuSubmit,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    onChange: handleMenuChange,
                    className: "cate__input",
                    name: "category",
                    placeholder: "메뉴판명을 입력해주세요"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(SummitBtn, {
                    className: "submit__btn",
                    type: "submit",
                    children: "제출하기"
                })
            ]
        })
    }));
};
/* harmony default export */ const MenuModal_MenuAddForm = (MenuAddForm);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/MenuModal/MenuUpdateForm.tsx





const MenuUpdateForm = ({ setModalOpen , menuId: menuId1 , menuName  })=>{
    const { 0: editMenuName , 1: setEditMenuName  } = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    const updateMenu = async (updateName, menuId)=>{
        try {
            const response = await external_axios_default().post("http://localhost:8080/menu/update", {
                updateName: updateName,
                menuId: String(menuId)
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            setModalOpen(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleMenuChange = (e)=>{
        console.log(e.target.value);
        setEditMenuName(e.target.value);
    };
    const handleUpdateMenuSubmit = (e)=>{
        e.preventDefault();
        typeof menuId1 !== "undefined" && updateMenu(editMenuName, menuId1);
    };
    const handleMenuFoodEdit = (e, menuId)=>{
        e.preventDefault();
        typeof menuId !== "undefined" && router.push({
            pathname: `/menupage/${menuId}`,
            query: {
                menuName: menuName
            }
        });
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(CateForm, {
        onSubmit: handleUpdateMenuSubmit,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                onChange: handleMenuChange,
                className: "cate__input",
                name: "category",
                placeholder: "수정할 메뉴판명을 입력해주세요"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "* 메뉴판 이름 수정 시에 입력한 메뉴판 명으로 변경됩니다."
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "* 해당 메뉴판의 메뉴를 수정하시고 싶으시면 메뉴 구성 수정하기를 눌러주세요."
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ButtonWrap, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                        children: "메뉴판 이름 수정하기"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                        onClick: (e)=>handleMenuFoodEdit(e, menuId1)
                        ,
                        children: "메뉴 구성 수정하기"
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const MenuModal_MenuUpdateForm = (MenuUpdateForm);

;// CONCATENATED MODULE: ./components/MenuModal/MenuModal.tsx








const MenuModal = ({ setModalOpen , type , categoryId , menuId , foodId , menuName  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(ModalWrap, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Modal, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(ModalCloseBtn, {
                    onClick: ()=>setModalOpen(false)
                    ,
                    children: "X"
                }),
                (()=>{
                    switch(type){
                        // 음식 추가
                        case "음식":
                            return(/*#__PURE__*/ jsx_runtime_.jsx(MenuModal_FoodAddForm, {
                                setModalOpen: setModalOpen,
                                categoryId: categoryId
                            }));
                        // 카테고리 추가
                        case "카테고리":
                            return(/*#__PURE__*/ jsx_runtime_.jsx(MenuModal_CategoryAddForm, {
                                setModalOpen: setModalOpen
                            }));
                        // 메뉴판 추가
                        case "메뉴판":
                            return(/*#__PURE__*/ jsx_runtime_.jsx(MenuModal_MenuAddForm, {
                                setModalOpen: setModalOpen
                            }));
                        case "메뉴판수정":
                            return(/*#__PURE__*/ jsx_runtime_.jsx(MenuModal_MenuUpdateForm, {
                                setModalOpen: setModalOpen,
                                menuId: menuId,
                                menuName: menuName
                            }));
                        case "음식수정":
                            return(/*#__PURE__*/ jsx_runtime_.jsx(MenuModal_FoodUpdateForm, {
                                setModalOpen: setModalOpen,
                                foodId: foodId
                            }));
                        default:
                            return null;
                    }
                })()
            ]
        })
    }));
};
/* harmony default export */ const MenuModal_MenuModal = (MenuModal);

;// CONCATENATED MODULE: ./components/MenuModal/index.ts



/***/ }),

/***/ 1464:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zx": () => (/* binding */ menuIdState),
/* harmony export */   "bL": () => (/* binding */ ownerIdState),
/* harmony export */   "yG": () => (/* binding */ foodListState),
/* harmony export */   "Qw": () => (/* binding */ tabClickedState),
/* harmony export */   "zg": () => (/* binding */ tabClickedNameState)
/* harmony export */ });
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);

const menuIdState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "menuIdState",
    default: ""
});
const ownerIdState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "ownerIdState",
    default: 0
});
const foodListState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "foodListState",
    default: []
});
const tabClickedState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "tabClickedState",
    default: 0
});
const tabClickedNameState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "tabClickedNameState",
    default: ""
});



/***/ })

};
;