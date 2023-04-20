import styles from './TransactionCategoriesPage.module.scss';
import {useEffect, useState} from "react";
import {Spinner} from "../../components/Spinner";
import {TransactionCategoriesService} from "../../api/transaction-categories-service";
import {AccentList} from "../../components/AccentList";
import {AccentLightButton} from "../../components/AccentLightButton";
import {AccentTextInput} from "../../components/AccentTextInput";
import {Link} from "react-router-dom";
import {AccentButton} from "../../components/AccentButton";
import {HiEye, HiEyeOff} from "react-icons/hi";
import {MdDelete} from "react-icons/md";

const TransactionCategoriesPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesPagination, setCategoriesPagination] = useState({
    page: 0,
    limit: 20,
  })

  const fetchCategories = async () => {
    const {transactionCategories} = await TransactionCategoriesService.getTransactionCategories({
      fields: 'id name svgPath color active',
      pagination: categoriesPagination,
    });
    setCategories(transactionCategories);
    console.log(transactionCategories)
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchCategories();
    } catch (error) {
      console.log("fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [categoriesPagination])

  const onHideCategory = async (category) => {
    try {
      await TransactionCategoriesService.updateTransactionCategories({
        fields: 'id',
        categoryId: category.id,
        active: !category.active,
      });
      await fetchCategories();
    } catch (error) {
      console.log("category update error", error);
    }
  }

  const onDeleteCategory = async (category) => {
    await TransactionCategoriesService.deleteTransactionCategories({
      fields: 'id',
      categoryId: category.id
    })
    setCategories(categories.filter(x => x.id !== category.id));
  }

  const onLoadNewer = () => {
    setCategoriesPagination({
      page: categoriesPagination.page - 1,
      limit: categoriesPagination.limit,
    });
  }

  const onLoadOlder = () => {
    setCategoriesPagination({
      page: categoriesPagination.page + 1,
      limit: categoriesPagination.limit,
    });
  }

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )


  return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <div className={styles.header}>
            <AccentTextInput inputProps={{placeholder: "Find a category..."}}/>
            <Link className={styles.link} to="/transaction_categories/new">
              <AccentButton value="New" width="60px" margin="0 0 5px 10px"/>
            </Link>
          </div>
          <AccentList items={categories.map(category => ({ view: (
              <div className={styles.categoryView}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="30" height="30">
                  <circle cx="14" cy="14" r="14" fill={category.color} fillRule="evenodd"></circle>
                  <path fill="#fff" d={category.svgPath}></path>
                </svg>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}>
                  <div className={styles.name}>
                    {category.name}
                  </div>
                  <div className={styles.controlButtons}>
                    <MdDelete size={20} color="#363636" onClick={() => onDeleteCategory(category)} />
                    <div onClick={() => onHideCategory(category)}>
                      {category.active ? <HiEye size={20} color='#363636' /> : <HiEyeOff size={20} color='#999999' /> }
                    </div>
                  </div>
                </div>
              </div>
            )
          }))}/>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px', columnGap: '10px'}}>
            <AccentLightButton content="Newer" onClick={onLoadNewer} disabled={categoriesPagination.page <= 0}/>
            <AccentLightButton content="Older" onClick={onLoadOlder} disabled={categories.length < categoriesPagination.limit}/>
          </div>
        </div>
      </div>
  );
}

export {TransactionCategoriesPage}
