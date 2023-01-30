import { Slider } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { makeParty, requestAPI } from "../../../../api/lostark/was"
import Button from "../../../../components/button"
import { purposes, targets, type } from "../../../../static/lostark/party"

const PartyCreateModal = ({ addParty, groupId }) => {
    const [selectedType, setSelectedType] = useState({ id: 1, name: "어비스 레이드" })
    const [selectedTarget, setSelectedTarget] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [selectedStages, setSelectedStages] = useState([1, 1])
    const [selectedPurpose, setSelectedPurpose] = useState("")

    const [selectableDifficulty, setSelectableDifficulty] = useState([])
    const [selectableStage, setSelectableStage] = useState(1)

    const onChangeType = (e) => {
        const newSelectedDungeon = type.find(el => el.name === e.target.value)
        setSelectedType(newSelectedDungeon)
    }

    const onChangeTarget = (e) => {
        setSelectedTarget(e.target.value)
    }

    const onChangeDifficulty = (e) => {
        setSelectedDifficulty(e.target.value)
    }

    const onChangePurpose = (e) => {
        setSelectedPurpose(e.target.value)
    }

    const onChangeStages = (e, newValue) => {
        setSelectedStages(newValue)
    }

    const getMarks = () => {
        const newMarks = []
        for (let i = 0; i < selectableStage; i++) newMarks.push({ value: i + 1, label: `${i + 1}관문` })
        return newMarks
    }

    const onClickMakeParty = () => {
        requestAPI({ apiFunction: requestMakeParty(), pass: onSuccessMakeParty, fail: onFailedMakeParty, onProcess: onProcessMakeParty })
    }

    const requestMakeParty = () => {
        const newParty = {
            type: selectedType.id,
            target: selectedTarget,
            difficulty: selectedDifficulty,
            stages: selectedStages,
        }
        addParty(newParty) // for test
        return makeParty(groupId, newParty)
    }

    const onSuccessMakeParty = (newParty) => {
        addParty(newParty)
    }

    const onFailedMakeParty = () => {
        alert("파티 생성 실패")
    }

    const onProcessMakeParty = () => {

    }

    useEffect(() => {
        const target = targets.find(el => el.type === selectedType.id)
        setSelectedTarget(target.name)
    }, [selectedType])

    useEffect(() => {
        if (!selectedTarget) return

        const target = targets.find(el => el.name === selectedTarget && el.type === selectedType.id)
        if (target.difficulty === undefined) {
            setSelectableDifficulty(undefined)
            setSelectedDifficulty(undefined)
        } else {
            setSelectableDifficulty(target.difficulty)
            setSelectedDifficulty(target.difficulty[0])
        }

        setSelectableStage(target.stages)
        setSelectedStages([1, target.stages])
    }, [selectedTarget])

    return (
        <ComponentWrapper>
            <div>파티 만들기</div>
            <SelectBox onChange={onChangeType} value={selectedType.name}>
                {
                    type.map(el => {
                        return (
                            <SelectOption>{el.name}</SelectOption>
                        )
                    })
                }
            </SelectBox>
            <SelectBox onChange={onChangeTarget} value={selectedTarget}>
                {
                    targets.filter(el => el.type === selectedType.id).map(el => {
                        return (
                            <SelectOption>{el.name}</SelectOption>
                        )
                    })
                }
            </SelectBox>
            <SelectBox onChange={onChangeDifficulty} value={selectedDifficulty} disabled={selectableDifficulty === undefined}>
                {
                    selectableDifficulty &&
                    selectableDifficulty.map(el => {
                        return (
                            <SelectOption>{el}</SelectOption>
                        )
                    })
                }
            </SelectBox>
            <Slider value={selectedStages} onChange={onChangeStages} min={1} max={selectableStage} step={1} marks={getMarks()} />
            <SelectBox onChange={onChangePurpose} value={selectedPurpose}>
                {
                    purposes.map(el => {
                        return (
                            <SelectOption>{el}</SelectOption>
                        )
                    })
                }
            </SelectBox>
            <Button text="파티 생성" onClick={onClickMakeParty} />
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
`

const SelectBox = styled.select`
    
`

const SelectOption = styled.option`
    
`

export default PartyCreateModal