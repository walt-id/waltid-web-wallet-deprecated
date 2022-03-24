<template>
    <div>
        <div v-for="item in specifiedBy"  v-bind:key="item">
            <IdentifierComponent :identifier="specifiedBy.identifier"/>
            <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="specifiedBy.title"/>
            <ItemValueComponent :title="$t('CREDENTIAL.VOLUME_OF_LEARNING')" :value="specifiedBy.voluemOfLearning"/>
            <ItemValueComponent :title="$t('CREDENTIAL.ECTS_CREDIT_POINTS')" :value="specifiedBy.eCTSCreditPoints"/>
            <ItemValueComponent :title="$t('CREDENTIAL.MAXIMUM_DURATION')" :value="specifiedBy.maximumDuration"/>
            <ItemValueComponent :title="$t('CREDENTIAL.ENTRY_REQUIREMENTS_NOTE')" :value="specifiedBy.entryRequirementsNote"/>
            <ItemValueComponent :title="$t('CREDENTIAL.IS_PARTIAL_QUALIFICATION')" :value="specifiedBy.isPartialQualification"/>
            <ItemValueComponent :title="$t('CREDENTIAL.EQFL_LEVEL')" :value="specifiedBy.eqflLevel"/>
            <ItemValueComponent :title="$t('CREDENTIAL.NQFL_LEVEL')" :value="specifiedBy.nqflLevel"/>
            <LoopLiComponent :items="specifiedBy.iSCEDFCode" :title="$t('CREDENTIAL.ISCEDF_CODE')"/>
            <!-- learning outcome -->
            <h5>{{ $t("CREDENTIAL.LEARNING_OUTCOME") }}</h5>
            <div v-for="outcome in specifiedBy.learningOutcome" v-bind:key="outcome">
                <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="outcome.id"/>
                <ItemValueComponent :title="$t('CREDENTIAL.NAME')" :value="outcome.name"/>
                <ItemValueComponent :title="$t('CREDENTIAL.NAME')" :value="outcome.name"/>
                <IdentifierComponent :identifier="outcome.identifier"/>
                <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="outcome.definition"/>
                <ItemValueComponent :title="$t('CREDENTIAL.LEARNING_OUTCOME_TYPE')" :value="outcome.learningOutcomeType"/>
                <ItemValueComponent :title="$t('CREDENTIAL.REUSABILITY_LEVEL')" :value="outcome.reusabilityLevel"/>
                <LoopLiComponent :title="$t('CREDENTIAL.RELATED_SKILL')" :items="outcome.relatedSkill"/>
                <LoopLiComponent :title="$t('CREDENTIAL.RELATED_ESCO_SKILL')" :items="outcome.relatedESCOSkill"/>
            </div>
            <LoopLiComponent :title="$t('CREDENTIAL.LEARNING_OPPORTUNITY_TYPE')" :items="specifiedBy.learningOpportunityTypes"/>
            <LoopLiComponent :title="$t('CREDENTIAL.ALTERNATIVE_LABEL')" :items="specifiedBy.alternativeLabels"/>
            <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="specifiedBy.definition"/>
            <ItemValueComponent :title="$t('CREDENTIAL.LEARNING_OUTCOME_DESCRIPTION')" :value="specifiedBy.learningOutcomeDescription"/>
            <LoopLiComponent :title="$t('CREDENTIAL.ADDITIONAL_NOTE')" :items="specifiedBy.additionalNote"/>
            <ItemValueComponent :title="$t('CREDENTIAL.HOME_PAGE')" :value="specifiedBy.homePage"/>
            <LoopLiComponent :title="$t('CREDENTIAL.SUPPLEMENTARY_DOCUMENT')" :items="specifiedBy.suplementaryDocuments"/>
            <LoopLiComponent :title="$t('CREDENTIAL.EDUCATION_SUBJECT')" :items="specifiedBy.educationSubject"/>
            <ItemValueComponent :title="$t('CREDENTIAL.CREDIT_POINTS')" :value="specifiedBy.creditPoints"/>
            <LoopLiComponent :title="$t('CREDENTIAL.EDUCATION_LEVEL')" :items="specifiedBy.educationLevel"/>
            <LoopLiComponent :title="$t('CREDENTIAL.LANGUAGE')" :items="specifiedBy.language"/>
            <LoopLiComponent :title="$t('CREDENTIAL.MODE')" :items="specifiedBy.modes"/>
            <ItemValueComponent :title="$t('CREDENTIAL.LEARNING_SETTING')" :value="specifiedBy.learningSetting"/>
            <ItemValueComponent :title="$t('CREDENTIAL.TARGET_GROUP')" :value="specifiedBy.targetGroups"/>
            <!-- TODO -->
            <!-- learningActivitySpecification -->
            <h5>{{ $t("CREDENTIAL.LEARNING_ACTIVITY_SPECIFICATION") }}</h5>


            <!-- assessmentSpecification -->
            <!-- entitlementSpecification -->
            <!-- hasPart -->
            <!-- specialisationOf -->
            <!-- awardingOpportunity -->
            <span class="col-12 pb-3">
                <h5>{{ $t("CREDENTIAL.AWARDING_OPPORTUNITY") }}</h5>
                <div v-for="awardingOpportunity in specifiedBy.awardingOpportunity" v-bind:key="awardingOpportunity">
                    <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="awardingOpportunity.id"/>
                    <IdentifierComponent :identifier="awardingOpportunity.identifier"/>
                    <LoopLiComponent :title="$t('CREDENTIAL.AWARDING_BODY')" :items="awardingOpportunity.awardingBody"/>
                    <ItemValueComponent :title="$t('CREDENTIAL.LOCATION')" :value="awardingOpportunity.location"/>
                    <ItemValueComponent :title="$t('CREDENTIAL.STARTED_AT_TIME')" :value="awardingOpportunity.startedAtTime"/>
                    <ItemValueComponent :title="$t('CREDENTIAL.ENDED_AT_TIME')" :value="awardingOpportunity.endedAtTime"/>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";
import IdentifierComponent from "./IdentifierComponent.vue";

export default {
  name: "AchievedSpecifiedByComponent",
  props: {
    specifiedBy: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    LoopLiComponent,
    ItemValueComponent,
    IdentifierComponent,
  },
}
</script>

<style scoped>

</style>