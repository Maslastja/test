from app.models.testtable import Test


def all_models():
    ArModels = []
    # независимые таблицы
    ArModels.append(Test)

    # зависимые таблицы
    return ArModels


def one_model(name):
    ArModels = all_models()
    for mod in ArModels:
        if name == mod.__name__:
            return mod
    return None
