from app.models.proc_list import Proc_list
from app.models.lp_list import Lp_list
from app.models.lp_intervals import Lp_intervals

def all_models():
    ArModels = []
    # независимые таблицы
    ArModels.append(Proc_list)

    # зависимые таблицы
    ArModels.append(Lp_list)
    ArModels.append(Lp_intervals)
    return ArModels


def one_model(name):
    ArModels = all_models()
    for mod in ArModels:
        if name == mod.__name__:
            return mod
    return None
