import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDispatcher = (mission, payload, select) => {
    const dispatch = useDispatch();

    const actions = {
        getData: getData(payload)
    }

    useEffect(() => {
        dispatch(actions[mission]);
    }, [dispatch, mission])

    const data = useSelector((state) => state[select])

    return { data }
}

export default useDispatcher;